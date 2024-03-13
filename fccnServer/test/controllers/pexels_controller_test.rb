require 'test_helper'

class PexelsControllerTest < ActionDispatch::IntegrationTest
  test "Fetch initial data" do
    get "http://127.0.0.1:3001/fetch?video_formation=grid"

    json_response = JSON.parse(response.body)

    assert_response :success
    # Check present
    assert json_response['videos'].present?
    assert json_response['total_pages'].present?
    assert json_response['page'].present?
    assert json_response['per_page'].present?
    assert json_response['resolution_options'].present?
    assert json_response['formats_per_page'].present?

    # Check values
    assert_equal 1, json_response['page']
    assert_equal 500, json_response['total_pages'] # This can change on the api so remove if failing
    assert_equal 16, json_response['per_page']
    assert_includes json_response['resolution_options'], 'HD'
    assert_includes json_response['resolution_options'], 'Full HD'
    assert_includes json_response['resolution_options'], '4k'
    
  end

  test "Search for data with empty query for grid" do
    get "http://127.0.0.1:3001/search?query=&resolution=HD&page=1&video_formation=grid"

    json_response = JSON.parse(response.body)

    assert_response :success
    # Check present
    assert json_response['videos'].present?
    assert json_response['total_pages'].present?
    assert json_response['page'].present?
    assert json_response['per_page'].present?

    # Check values
    assert_equal 1, json_response['page']
    assert_equal 500, json_response['total_pages'] # This can change on the api so remove if failing
    assert_equal 16, json_response['per_page']
      
  end

  test "Search for data with empty query for column" do
    get "http://127.0.0.1:3001/search?query=&resolution=HD&page=1&video_formation=column"

    json_response = JSON.parse(response.body)

    assert_response :success
    # Check present
    assert json_response['videos'].present?
    assert json_response['total_pages'].present?
    assert json_response['page'].present?
    assert json_response['per_page'].present?

    # Check values
    assert_equal 1, json_response['page']
    assert_equal 800, json_response['total_pages'] # This can change on the api so remove if failing
    assert_equal 10, json_response['per_page']
      
  end

  test "Search for data with query" do
    get "http://127.0.0.1:3001/search?query=earth&resolution=HD&page=1&video_formation=grid"

    json_response = JSON.parse(response.body)
    assert_response :success
    # Check present
    assert json_response['videos'].present?
    assert json_response['total_pages'].present?
    assert json_response['page'].present?
    assert json_response['per_page'].present?

    # Check values
    assert_equal 1, json_response['page']
    assert_equal 36, json_response['total_pages'] # This can change on the api so remove if failing
    assert_equal 16, json_response['per_page'] 
  end

  test "Search for data with query and page" do
    get "http://127.0.0.1:3001/search?query=earth&resolution=HD&page=15&video_formation=grid"

    json_response = JSON.parse(response.body)
    assert_response :success
    # Check present
    assert json_response['videos'].present?
    assert json_response['total_pages'].present?
    assert json_response['page'].present?
    assert json_response['per_page'].present?

    # Check values
    assert_equal 15, json_response['page']
    assert_equal 36, json_response['total_pages'] # This can change on the api so remove if failing
    assert_equal 16, json_response['per_page'] 
  end
end