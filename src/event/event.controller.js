const events = (req, res) => {
  const eventsJSON = [
    {
      id: 1,
      name: "Education",
    },
    {
      id: 2,
      name: "Poverty",
    },
  ];
  res.json(eventsJSON);
};

module.exports = {
  events,
};
