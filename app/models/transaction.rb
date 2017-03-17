class Transaction < ApplicationRecord
  self.primary_key = 'uid'
  belongs_to :agents,  dependent: :destroy
end
