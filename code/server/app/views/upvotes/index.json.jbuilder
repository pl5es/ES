# frozen_string_literal: true

json.array! @upvotes, partial: "upvotes/upvote", as: :upvote
