defmodule ApiServerWeb.MemberView do
  use ApiServerWeb, :view
  alias ApiServerWeb.MemberView

  def render("index.json", %{members: members}) do
    %{data: render_many(members, MemberView, "member.json")}
  end

  def render("show.json", %{member: member}) do
    %{data: render_one(member, MemberView, "member.json")}
  end

  def render("member.json", %{member: member}) do
    %{id: member.id,
      name: member.name,
      role: member.role,
    }
  end

  def render("member_with_token.json", %{member: member}) do
    %{id: member.id,
      name: member.name,
      role: member.role,
      token: member.token,
    }
  end
end
