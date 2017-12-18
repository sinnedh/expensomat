defmodule ApiServerWeb.MemberControllerTest do
  use ApiServerWeb.ConnCase

  describe "index" do
    test "list all members of calculation for all members"
    test "does not list members of other calculations"
  end

  describe "create member" do
    test "renders member when data is valid"
    test "renders errors when data is invalid"
    test "creates a new token for this member"
    test "ignores a possible token in request"
    test "creates member only when token is valid"
  end

  describe "update member" do
    test "renders member when data is valid"
    test "renders errors when data is invalid"
    test "ignores a possible token in request"
    test "updates member only when token is valid"
  end

  describe "delete member" do
    test "deletes chosen member"
    test "deletes member only when token is valid"
  end
end
