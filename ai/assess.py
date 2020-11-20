import numpy as np
import cv2
import tensorflow as tf

face_detection = cv2.CascadeClassifier('haar_cascade_face_detection.xml')
labels = ["Neutral","Happy","Sad","Surprise","Angry"]

model = tf.keras.models.load_model('expression.model')

def classify_img(img):
	gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
	detected = face_detection.detectMultiScale(gray, **settings)
	states = [[], [], [], [], []]
	for x, y, w, h in detected:
		cv2.rectangle(img, (x, y), (x+w, y+h), (245, 135, 66), 2)
		cv2.rectangle(img, (x, y), (x+w//3, y+20), (245, 135, 66), -1)
		face = gray[y+5:y+h-5, x+20:x+w-20]
		face = cv2.resize(face, (48,48)) 
		face = face/255.0
		predictions = model.predict(np.array([face.reshape((48,48,1))])).argmax()
		state = labels[predictions]
		states[predictions].append(state)
	return states

def read_frames(video_path):
	vidcap = cv2.VideoCapture(video_path)
	success, image = vidcap.read()
	ps_count = []
	while success:
		avg_p = np.array(
			classify_img(image)).mean()
		ps_count.append(avg_p)
		_, image = vidcap.read()
	return ps_count

def parse_video(obj):
	video_name, _id = obj
	score = 0
	with tempfile.TemporaryDirectory() as s3dir:
		vp = os.path.join(s3dir, video_name)
		s3.Bucket(BUCKET_NAME).download_file(
			video_name, p)

		# computes scores across meeting
		scores = read_frames(vp)

		# TODO compute score
		score = -1
	return score	

def loop(db_collection, status_code, wait_time):
    filtered = \
        [(p['video_url'], p['_id'])
            for p in db_collection.find() if p['status'] == status_code]

    logging.debug(f'Received {filtered}')
    for to_classify in filtered:
		parse_video(to_classify)
    logging.debug(f'Completed {filtered}')
    time.sleep(wait_time)

if __name__ == "__main__":
	loop("our_collection", 0, 5)
	camera.release()
	cv2.destroyAllWindows()


