-- Use SQL insert statements to add any
-- starting/dummy data to your database tables

-- EXAMPLE:

--  insert into "todos"
--    ("task", "isCompleted")
--    values
--      ('Learn to code', false),
--      ('Build projects', false),
--      ('Get a job', false);

export const lineChartData = {
labels:[
  "Week 1","Week 2","Week3","Week4"
],
datasets: [
  {
    label:"Wellness Score",
    data: [10,20,30,40],
    borderColor:"rgb(75,192,234)"
  }
]
}
