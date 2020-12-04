import unittest
import cv2
from assess import read_frames, compute_score, classify_img
import numpy
class TestViber(unittest.TestCase):
    def test_score(self):
        self.assertTrue(isinstance(compute_score(read_frames("./short.mp4")), float))
    def test_classify(self):
        self.assertTrue(isinstance(classify_img(cv2.imread("./examplepic.png")), numpy.int64))

if __name__ == '__main__':
    unittest.main()