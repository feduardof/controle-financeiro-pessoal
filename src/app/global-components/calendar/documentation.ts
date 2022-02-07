export default {
  "events": [
    {
      "event": "monthChange",
      "params": "date",
      "description": "On month change in display"
    },
    {
      "event": "dateChange",
      "params": "date",
      "description": "On the date is selected"
    }
  ],
  "outputs" : [
    {
      "name" : "delimiter",
      "type" : "DateRanger",
      "description" : "Define the range that is possible set the date"
    },
    {
      "name" : "dateRange",
      "type" : "DateRanger",
      "description" : "Define the range selected by user"
    }
  ]
}
