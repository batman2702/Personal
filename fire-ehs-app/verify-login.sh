
echo "Testing Login API..."
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email": "admin@syngene.com", "password": "password123"}' | jq .
