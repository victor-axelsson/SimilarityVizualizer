import datetime
import matplotlib.pyplot as plt
import numpy as np
from sklearn.preprocessing import normalize
import scipy
import math
import pickle
import os.path
from flask import Flask
from flask import request
import json
from flask_cors import CORS, cross_origin
from sklearn.metrics.pairwise import cosine_similarity

def read_data(fname, withHeaders=True):
	with open(fname) as f:
		lines = f.readlines()

	content = [line.strip() for line in lines]

	tmp = []
	for i in range(len(content)):
		pts = content[i].split(";")
		if len(pts) > 0: 
			wasOk = True

			for col in pts:
				if len(col) <= 0: 
					wasOk = False
					break

			if wasOk:
				tmp += [pts]

	content = tmp

	if withHeaders:
		return content[2:], content[:1][0]
	else:
		return content

def parseBool(val):
	if val == "Yes":
		return 1
	else:
		return 0

def parseFloat(val):
	return float(val)

def parseDate(val):
	return int(datetime.datetime.strptime(val, '%Y-%m-%d').timestamp())

def parseInt(val):
	return int(val)

def cosineSimilarity(x, y):
	# The commented out section is an implementation of cosine similarity
	# It works in the same way as the scipy implementation but less efficient
	# Its kept for educational purposes
	'''
	numerator = np.dot(x, y)

	xNorm = 0
	for xi in x:
		xNorm += math.pow(abs(xi), 2)

	xNorm = math.pow(xNorm, (1 / 2))

	yNorm = 0
	for yi in y:
		yNorm += math.pow(abs(yi), 2)

	yNorm = math.pow(yNorm, (1/2))

	denominator = xNorm * yNorm

	return numerator / denominator
	'''
	return cosine_similarity([x], [y])[0][0]

def jaccardSimilarity(x, y):
	
	m11 = 0
	m10 = 0
	m01 = 0

	for i in range(len(x)):
		if x[i] == 1 and y[i] == 1:
			m11 += 1
		elif x[i] == 1 and y[i] == 0:
			m10 += 1
		elif y[i] == 1 and x[i] == 0:
			m01 += 1

	return m11 / (m10 + m01 + m11)

def reverseRow(row):
	row[3] = 1 - row[3] 
	row[4] = 1 - row[4] 
	row[5] = 1 - row[5] 
	row[6] = 1 - row[6]
	row[8] = 1 - row[8]

	row[10] = 1 - row[10]
	row[11] = 1 - row[11]
	row[12] = 1 - row[12]
	row[13] = 1 - row[13]
	row[14] = 1 - row[14]
	row[15] = 1 - row[15]
	row[16] = 1 - row[16]
	row[17] = 1 - row[17]
	row[18] = 1 - row[18]
	row[19] = 1 - row[19]
	row[20] = 1 - row[20]
	row[21] = 1 - row[21]
	row[22] = 1 - row[22]
	row[23] = 1 - row[23]
	row[24] = 1 - row[24]
	row[25] = 1 - row[25]
	row[26] = 1 - row[26]

	return row

parseDict = {
	'date': parseDate,					#0
	'temperaturemin' : parseFloat,		#1 				used
	'temperaturemax':parseFloat,		#2				used
	'precipitation': parseFloat,		#3  inversed	used
	'snowfall':parseBool,				#4  inversed
	'snowdepth': parseFloat,			#5  inversed
	'avgwindspeed': parseFloat,			#6  inversed
	'fastest2minwinddir': parseInt,		#7
	'fastest2minwindspeed': parseFloat,	#8  inversed
	'fastest5secwinddir': parseInt,		#9
	'fastest5secwindspeed': parseFloat,	#10 inversed
	'fog': parseBool,					#11 inversed	used
	'fogheavy': parseBool,				#12 inversed
	'mist': parseBool,					#13 inversed
	'rain': parseBool,					#14 inversed
	'fogground': parseBool,				#15 inversed
	'ice': parseBool,					#16 inversed
	'glaze': parseBool,					#17 inversed
	'drizzle': parseBool,				#18 inversed
	'snow': parseBool,					#19 inversed
	'freezingrain': parseBool,			#20 inversed
	'smokehaze':parseBool,				#21 inversed
	'thunder': parseBool,				#22 inversed
	'highwind': parseBool,				#23 inversed
	'hail': parseBool,					#24 inversed
	'blowingsnow': parseBool,			#25 inversed
	'dust': parseBool,					#26 inversed
	'freezingfog': parseBool			#27 inversed
}

def lazyloadNormalizedData():
	filename = "normalizedData.bin"
	headerName = "headers.bin"
	dictionaryName = "dictionary.bin"
	reverseDicionaryName = "reverse_dictionary.bin"

	dictionary = {}
	reverse_dictionary = {}

	data = None

	if os.path.isfile(filename):
		#load from disk
		data = pickle.load(open(filename, "rb"))
		headers = pickle.load(open(filename, "rb"))
		dictionary = pickle.load(open(dictionaryName, "rb"))
		reverse_dictionary = pickle.load(open(reverseDicionaryName, "rb"))

	else:
		data, headers = read_data("rdu-weather-history.csv")

		for i in range(len(data)):
			row = data[i]

			dictionary[row[0]] = i 
			reverse_dictionary[i] = row[0] 

			for j in range(0, len(row)):
				if len(row[j]) > 0:
					row[j] = parseDict[headers[j]](row[j])



		data = normalize(data, axis=0, norm='max')

		#dump to disk
		pickle.dump(data, open(filename, "wb"))
		pickle.dump(headers, open(headerName, "wb"))
		pickle.dump(dictionary, open(dictionaryName, "wb"))
		pickle.dump(reverse_dictionary, open(reverseDicionaryName, "wb"))

	return data, headers, dictionary, reverse_dictionary

# Load the graph data
print("Loading graph data...")
data, headers, dictionary, reverse_dictionary = lazyloadNormalizedData()
print("Loaded graph data")

#FLASK_APP=main.py flask run --port=6001 
app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

# Expose the graph as an API
@app.route("/item/similar")
@cross_origin()
def getSimilarDevice():
	item = request.args.get('item')
	threshold = float(request.args.get('threshold'))

	goodMatches = []
	bestIndex = None
	bestScore = -1
	x = data[dictionary[item]]

	for i in range(len(data)):

		y = data[i]

		# We don't compare with ourselves cause that gives a perfect score
		if i == dictionary[item]:
			continue

		score = cosineSimilarity(x, y)

		if score > bestScore:
			bestIndex = i
			bestScore = score

		if score > threshold:
			goodMatches.append({'label': reverse_dictionary[i], 'score': score})

	return json.dumps({
		'bestMatch': reverse_dictionary[bestIndex],
		'score': bestScore,
		'items': goodMatches
	})

@app.route("/item/similar/compare", methods=['POST'])
@cross_origin()
def compareDeviceSimilarity():
	inputData = request.get_json()

	allScore = 0
	individualScores = []

	for i in range(len(inputData['items'])):
		x_i = inputData['items'][i]

		for j in range(i +1, len(inputData['items'])):
			x_j = inputData['items'][j]

			score = cosineSimilarity(data[dictionary[x_i]], data[dictionary[x_j]])

			allScore += score
			individualScores.append({
				'x_i': x_i,
				'x_j': x_j,
				'score': score
			})

	score = 0
	if len(individualScores) > 0:
		score = float(allScore / len(individualScores))

	return json.dumps({
		'itemScores': individualScores,
		'absoluteScore': allScore,
		'n_items': len(inputData['items']),
		'n_comparisons': len(individualScores),
		'avg_sim_score': score,
		'diversity': 1 - score
	})


@app.route("/item/", methods=['GET'])
@cross_origin()
def getAllItems():
	items = []
	for item in dictionary:
		items.append(item)

	return json.dumps(items)


#Serve the API 
app.run(port=6001, threaded=True)
