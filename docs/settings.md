### Config file example ###

Boilerplate file can be found [here](../config/config.yml.dist)



Example to proxy weather from [OpenWeatherMap](http://openweathermap.org)
```yaml
ExternalApi:
  URL: http://api.openweathermap.org/data/2.5/forecast?lang=ru&units=metric&APPID=<your app id here>
  Params: /:lat/:lon
```


Weather in New-York City
```js
GET /40/-74
```

