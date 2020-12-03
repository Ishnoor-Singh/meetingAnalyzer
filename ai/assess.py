import numpy as np
import cv2
import tensorflow as tf
import boto3

# s3 setup
BUCKET_NAME = "elasticbeanstalk-us-west-1-516879159697"
session = boto3.Session(
			region_name='us-west-2',
			aws_access_key_id=os.environ['AWS_ACCESS_KEY'],
			aws_secret_access_key=os.environ['AWS_SECRET_KEY'])
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
	vidcap = cv2.VideoCapture(video_path)
	success, image = vidcap.read()
	ps_count = []
	while success:
		curr_p = np.array(classify_img(image))
		ps_count.append(curr_p)
		success, image = vidcap.read()
	return ps_count

def compute_score(scores):
	curr_score = 50
	for classification in scores: 
		if classification == 1 or classification == 3: 
			curr_score += 0.6
		if classification == 2 or classification == 4: 
			curr_score -= 0.2
	return curr_score	

def parse_video(obj):
	video_name, _id = obj
	score = 0
	with tempfile.TemporaryDirectory() as s3dir:
		vp = os.path.join(s3dir, video_name)
		s3.Bucket(BUCKET_NAME).download_file(
			video_name, vp)
		scores = read_frames(vp)
		return compute_score(scores)

def loop(db_collection, status_code, wait_time):
	filtered = \
		[(p['video_name'], p['_id'])
			for p in db_collection.find() if p['status'] == status_code]
	logging.debug(f'Received {filtered}')
	for to_classify in filtered:
		parse_video(to_classify)
	logging.debug(f'Completed {filtered}')
	time.sleep(wait_time)

if __name__ == "__main__":
	while True: 
		try:
			loop(reps, 0, 5)
		except KeyboardInterrupt: 
			break
		camera.release()
		cv2.destroyAllWindows()


