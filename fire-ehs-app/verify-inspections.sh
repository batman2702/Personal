
#!/bin/bash

# 1. Login to get token
echo "Logging in..."
LOGIN_RESPONSE=$(curl -s -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email": "admin@syngene.com", "password": "password123"}')

TOKEN=$(echo $LOGIN_RESPONSE | jq -r '.token')

if [ "$TOKEN" == "null" ]; then
  echo "Login failed!"
  echo $LOGIN_RESPONSE
  exit 1
fi

echo "Token received: $TOKEN"

# 2. Get Inspections
echo ""
echo "Fetching Inspections..."
curl -s -X GET http://localhost:3000/api/inspections \
  -H "Authorization: Bearer $TOKEN" | jq .
