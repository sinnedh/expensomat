# Script for populating the database. You can run it as:
#
#     mix run priv/repo/seeds.exs
#
# Inside the script, you can read and write to any of your
# repositories directly:
#
#     ApiServer.Repo.insert!(%ApiServer.SomeSchema{})
#
# We recommend using the bang functions (`insert!`, `update!`
# and so on) as they will fail if something goes wrong.

alias ApiServer.Repo
alias ApiServer.Calculations.Calculation
alias ApiServer.Calculations.Expense
alias ApiServer.Calculations.Member

Repo.delete_all Member
Repo.delete_all Expense
Repo.delete_all Calculation

c1 = Repo.insert!(%Calculation{
  name: "TV room",
  description: "Shared expenses for our TV room",
})

Repo.insert!(%Expense{
  calculation_id: c1.id,
  amount: 74999,
  description: "Projector",
})

Repo.insert!(%Expense{
  calculation_id: c1.id,
  amount: 329,
  description: "Scart Cable",
})

Repo.insert!(%Expense{
  calculation_id: c1.id,
  amount: 15000,
  description: "Screen",
})


c2 = Repo.insert!(%Calculation{
  name: "Houseboat Holiday",
  description: "Expenses for the houseboat holiday in summer 2017",

})

Repo.insert!(%Expense{
  calculation_id: c2.id,
  amount: 143000,
  description: "Rent for Boat",
})

Repo.insert!(%Expense{
  calculation_id: c2.id,
  amount: 12078,
  description: "Dinner at the harbour",
})

Repo.insert!(%Expense{
  calculation_id: c2.id,
  amount: 12800,
  description: "Final cleaning",
})


c3 = Repo.insert!(%Calculation{
  name: "Micha / Dennis",
  description: "Shared expenses between Micha and Dennis",
})

c3_m1 = Repo.insert!(%Member{
  calculation_id: c3.id,
  name: "Micha",
})

c3_m2 = Repo.insert!(%Member{
  calculation_id: c3.id,
  name: "Dennis",
})

Repo.insert!(%Expense{
  paid_at: elem(DateTime.from_iso8601("2017-10-11 12:00:00.0Z"), 1),
  paid_by: [c3_m2],
  paid_for: [c3_m1],
  calculation_id: c3.id,
  amount: 800,
  description: "Pasta  beim Italiener",
})

Repo.insert!(%Expense{
  paid_at: elem(DateTime.from_iso8601("2017-10-01 12:00:00.0Z"), 1),
  paid_by: [c3_m2],
  paid_for: [c3_m1],
  calculation_id: c3.id,
  amount: 550,
  description: "Königsberger Klopse im Orderbird Cafe",
})

Repo.insert!(%Expense{
  paid_at: elem(DateTime.from_iso8601("2017-09-25 12:00:00.0Z"), 1),
  paid_by: [c3_m1],
  paid_for: [c3_m2],
  calculation_id: c3.id,
  amount: 850,
  description: "Pizza beim Fake Vapiano",
})

Repo.insert!(%Expense{
  paid_at: elem(DateTime.from_iso8601("2017-09-20 12:00:00.0Z"), 1),
  paid_by: [c3_m2],
  paid_for: [c3_m1],
  calculation_id: c3.id,
  amount: 1000,
  description: "Geliehen beim Fake Vapiano",
})
