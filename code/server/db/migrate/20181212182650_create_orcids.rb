class CreateOrcids < ActiveRecord::Migration[5.2]
  def change
    create_table :orcids do |t|

      t.timestamps
    end
  end
end
