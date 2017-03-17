class Agent < ApplicationRecord
  self.primary_key = 'account'
  has_many :transactions,  dependent: :destroy, :foreign_key => 'agent'
end
