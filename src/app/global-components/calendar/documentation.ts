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
    },
    {
      "event": "dateRangeChange",
      "params": "DateRange",
      "description": "On the one date of range is selected"
    }

  ],
  "outputs" : [
    {
      "name" : "delimiter",
      "type" : "DateRange",
      "description" : "Define the range that is possible set the date"
    },
    {
      "name" : "dateRange",
      "type" : "DateRange",
      "description" : "Define the range selected by user"
    }
  ]
}
