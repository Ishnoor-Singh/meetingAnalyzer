import os
import time
import numpy as np
import cv2
import tensorflow as tf
import boto3
import logging
import pymongo

# s3 setup
BUCKET_NAME = "elasticbeanstalk-us-west-1-516879159697"
session = boto3.Session(
			region_name='us-west-1',
			aws_access_key_id="AKIAI3AKGQZ25MWDPIIQ",
			aws_secret_access_key="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")
s3 = boto3.resource('s3')

# mongodb setup
mdb = "mongodb+srv://ashkan:Password123!@cluster0.la44h.mongodb.net/Test?retryWrites=true&w=majority"
client = pymongo.MongoClient(mdb)
db = client.collection
reps = db.reports

# ai/face detection setup
face_detection = cv2.CascadeClassifier('haar_cascade_face_detection.xml')
labels = ["Neutral","Happy","Sad","Surprise","Angry"]
model = tf.keras.models.load_model('expression.model')
settings = {
    'scaleFactor': 1.3, 
    'minNeighbors': 5, 
    'minSize': (50, 50)
}


def classify_img(img):
	"""classifies an image frame. 
		:param img: (cv2 image) an image to classify.
		:return: (int) the highest classification associated with the analyzed frame. 
	"""
	gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
	detected = face_detection.detectMultiScale(gray, **settings)
	states = [0, 0, 0, 0, 0]
	for x, y, w, h in detected:
		cv2.rectangle(img, (x, y), (x+w, y+h), (245, 135, 66), 2)
		cv2.rectangle(img, (x, y), (x+w//3, y+20), (245, 135, 66), -1)
		face = gray[y+5:y+h-5, x+20:x+w-20]
		face = cv2.resize(face, (48,48)) 
		face = face/255.0
		predictions = model.predict(np.array([face.reshape((48,48,1))])).argmax()
		states[predictions] += 1
	return np.array(states).argmax()


def read_frames(video_path):
	"""reads frames and appends the current classification to an array.
		:param video_path: (str) the path to the video to read (must be .mp4)
		:return: (list) An array where index i corresponds to classification at frame i.  
	"""
	vidcap = cv2.VideoCapture(video_path)
	success, image = vidcap.read()
	ps_count = []
	while success:
		curr_p = np.array(classify_img(image))
		ps_count.append(curr_p)
		success, image = vidcap.read()
	return ps_count


def compute_score(scores):
	"""computes a score given an array of scores 
		:param scores: (list) A list of scores associated with every frame in the video
		:return: (float) The final score associated with the scores array. 
	"""
	curr_score = 50
	for classification in scores: 
		if classification == 1 or classification == 3: 
			curr_score += 0.6
		if classification == 2 or classification == 4: 
			curr_score -= 0.2
	return curr_score	


def parse_video(obj):
	"""parses a video by downloading from s3 and computing 
		its score based on analyzing its frames. 
		:param obj: (tuple) formed by (video_name, database_id)
		:return: (float) The score associated with the parsed video. 
	"""
	video_name, _id = obj
	score = 0
	with tempfile.TemporaryDirectory() as s3dir:
		vp = os.path.join(s3dir, video_name)
		s3.Bucket(BUCKET_NAME).download_file(
			video_name, vp)
		scores = read_frames(vp)
		return compute_score(scores)


def db_update(item):
	"""updates an item as completed on the db. 
		:param item: (tuple) formed by (video_name, database_id).
	"""
	# logging.info(f'Updating {item} on DB...')
	reps.update_one({
				'_id': item[1]
				},
				{
				'$set': {
					'status': 1
				}
			}, upsert=False)
	# logging.info(f'Successfully updated {item} on DB')


def loop(db_collection, status_code, wait_time):
	"""constantly checks the db, if new reviews have to be processed. 
		:param db_collection: (pymongo collection) the collection to scrape information from
		:param status_code: (int) the status to monitor in case new reviews are detected
		:param wait_time: (int) time to wait between sampling the db
	"""
	filtered = \
		[(p['video_name'], p['_id'])
			for p in db_collection.find() if p['status'] == status_code]
	# logging.debug(f'Received {filtered}')
	for to_classify in filtered:
		parse_video(to_classify)
		db_update(to_classify)
	# logging.debug(f'Completed {filtered}')
	time.sleep(wait_time)

if __name__ == "__main__":
	while True: 
		try:
			loop(reps, 0, 5)
		except KeyboardInterrupt: 
			break
		camera.release()
		cv2.destroyAllWindows()\
