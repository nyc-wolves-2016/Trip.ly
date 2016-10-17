require 'open-uri'
require 'json'

module TripsHelper

  def format_location(entry)
    entry.split.map(&:capitalize).join('_')
  end

  def parser(city, country)

    city = format_location(city)
    country = format_location(country)

    base_url = "http://api.wunderground.com/api/"
    key = Rails.application.secrets.WUNDERGROUND_KEY
  url_end = "/forecast/q"
    request_url = "/#{country}/#{city}.json"
    data_uri = URI.parse(base_url + key + url_end + request_url)

    JSON.parse(data_uri.open{|file| file.readlines }.join)

  end


  def format_results(data)

    results = []
    [0,2,4,6].each do |num|
      day = data["forecast"]["txt_forecast"]["forecastday"][num]["title"]
      forecast = data["forecast"]["txt_forecast"]["forecastday"][num]["fcttext"]
      results.push(day, forecast)
    end
    results
  end


end


 # city = TripsHelper.format_location("New York")
 # country = TripsHelper.format_location("NY")
 # data = TripsHelper.parser(city, country)
 # results = TripsHelper.format_results(data)
 # puts results
