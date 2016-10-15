# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20161014193811) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "events", force: :cascade do |t|
    t.string   "name",         null: false
    t.string   "location"
    t.text     "details"
    t.text     "contact_info"
    t.date     "date",         null: false
    t.time     "start_time"
    t.time     "end_time"
    t.integer  "itinerary_id"
    t.datetime "created_at",   null: false
    t.datetime "updated_at",   null: false
    t.index ["itinerary_id"], name: "index_events_on_itinerary_id", using: :btree
  end

  create_table "items", force: :cascade do |t|
    t.string   "name",                            null: false
    t.boolean  "packed",          default: false
    t.integer  "packing_list_id"
    t.datetime "created_at",                      null: false
    t.datetime "updated_at",                      null: false
    t.index ["packing_list_id"], name: "index_items_on_packing_list_id", using: :btree
  end

  create_table "itineraries", force: :cascade do |t|
    t.integer  "trip_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["trip_id"], name: "index_itineraries_on_trip_id", using: :btree
  end

  create_table "packing_lists", force: :cascade do |t|
    t.string   "name",       null: false
    t.integer  "trip_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["trip_id"], name: "index_packing_lists_on_trip_id", using: :btree
  end

  create_table "resource_lists", force: :cascade do |t|
    t.string   "name",       null: false
    t.integer  "trip_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["trip_id"], name: "index_resource_lists_on_trip_id", using: :btree
  end

  create_table "resources", force: :cascade do |t|
    t.string   "name",             null: false
    t.text     "details"
    t.string   "link"
    t.integer  "resource_list_id"
    t.datetime "created_at",       null: false
    t.datetime "updated_at",       null: false
    t.index ["resource_list_id"], name: "index_resources_on_resource_list_id", using: :btree
  end

  create_table "trips", force: :cascade do |t|
    t.string   "city",       null: false
    t.string   "country"
    t.date     "start_date", null: false
    t.date     "end_date",   null: false
    t.integer  "user_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["user_id"], name: "index_trips_on_user_id", using: :btree
  end

  create_table "users", force: :cascade do |t|
    t.string   "first_name",                          null: false
    t.string   "last_name",                           null: false
    t.datetime "created_at",                          null: false
    t.datetime "updated_at",                          null: false
    t.string   "email",                  default: "", null: false
    t.string   "encrypted_password",     default: "", null: false
    t.string   "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer  "sign_in_count",          default: 0,  null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.inet     "current_sign_in_ip"
    t.inet     "last_sign_in_ip"
    t.string   "provider"
    t.string   "uid"
    t.index ["email"], name: "index_users_on_email", unique: true, using: :btree
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true, using: :btree
  end

end
