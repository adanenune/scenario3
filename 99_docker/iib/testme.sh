echo
echo "Test command used:"
echo "curl -X POST -d @test_event1.json -H "Content-Type: application/json" http://localhost:7800/orderupdates"
echo
curl -X POST -d @test_event1.json -H "Content-Type: application/json" http://localhost:7800/orderupdates
echo
echo
