defmodule Rpg.Email do
  @moduledoc """
  Email module
  """
  import Bamboo.Email

  def welcome_email(to, code) do
    new_email(
      to: to,
      from: "guillaume.bailleul@gmail.com",
      subject: "Welcome to Rick Prfessionnal Garbage.",
      html_body:
        "<strong>Thanks for joining!</strong>. Click to activate your account #{
          RpgWeb.Endpoint.url()
        }/api/v1/users/activate/#{code}",
      text_body: "Thanks for joining!"
    )
  end
end
