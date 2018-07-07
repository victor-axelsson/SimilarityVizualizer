# About 
This is a simple template for visualizing similarities in high dimensional data. The project contains 2 projects. A python API and a react frontend. 

The python API will: 
- Grab data from a csv with weather data
- Normalize it
- Expose cosine similarity between rows through a simple FLASK api. 

The react frontend will: 
- Get user input about dates
- Ask the API for days with similar weather
- Ask the API about diversity in a subset if weather data
- Do frontend filtering with a threshold to more clearly see graph centrality



# Setup 
- `git clone https://github.com/victor-axelsson/react_template.git`
- `npm install`

Used pip3 packages: 
```
Flask_Cors==3.0.6
Flask==0.12.2
matplotlib==2.2.2
scipy==1.1.0
numpy==1.14.5
scikit_learn==0.19.1
```

Istallation of python packages: 

- `pip3 install Flask_Cors`
- `pip3 install Flask` 
- `pip3 install matplotlib`
- `pip3 install scipy`
- `pip3 install numpy`
- `pip3 install scikit_learn`

## Start API

- `cd api` 
- `python3 main.py`

## Start frontend

- `npm start`


# Check similar to this

Get a data from the CSV, like `2009-01-05` and put it in the textbox and click the button `Check similar to this`. It might be a bit laggy in the beggining. Use the slider to put it to a higher threshold and get a smaller graph. 


# Get intra similarity

Get multiple dates from the dataset. The easiest way to do this is to do a GET request to `localhost:6001/item/` and grab a couple of items (must be less than 50). Put it in the input box in the following format: 

```
"2010-01-10", "2010-01-14", "2010-01-19", "2010-02-16", "2010-02-20", "2010-02-22", "2010-03-02", "2010-03-09", "2010-03-16", "2010-03-20", "2010-04-02", "2010-04-04", "2010-04-06", "2010-04-14", "2010-05-02", "2010-05-10", "2010-05-14", "2010-05-16", "2010-05-20", "2010-05-26", "2010-05-28", "2010-06-01", "2010-06-02", "2010-06-14", "2010-06-15", "2010-06-25", "2010-06-27", "2010-07-20", "2010-07-21", "2010-07-24", "2010-07-28", "2010-07-30"
```

They will be split by `","` and trimmed. It might be a bit laggy in the beggining. Use the slider to put it to a higher threshold and get a smaller graph. 
