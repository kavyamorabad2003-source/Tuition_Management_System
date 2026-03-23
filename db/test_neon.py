import urllib.request
import json
import ssl

def get_neon_token():
    try:
        with open("../Tokens/Project_Token.txt", "r") as f:
            lines = f.readlines()
            for i, line in enumerate(lines):
                if line.strip() == "Neon":
                    return lines[i+2].strip()
    except Exception as e:
        print(f"Error reading token: {e}")
    return None

API_KEY = get_neon_token()

ctx = ssl.create_default_context()

print("=" * 50)
print("  NEON CONNECTION TEST")
print("=" * 50)

# Test 1: List projects via Neon API
print("\n[1] Testing Neon API key by listing projects...")
try:
    req = urllib.request.Request(
        "https://console.neon.tech/api/v2/projects",
        headers={
            "Authorization": f"Bearer {API_KEY}",
            "Accept": "application/json"
        }
    )
    with urllib.request.urlopen(req, context=ctx) as resp:
        data = json.loads(resp.read().decode())
        projects = data.get("projects", [])
        print(f"   ✅ API connection successful!")
        print(f"   Found {len(projects)} project(s):")
        for p in projects:
            print(f"      - {p['name']} (ID: {p['id']}, Region: {p.get('region_id', 'N/A')})")

        if projects:
            print(f"\n[2] Fetching connection details...")
            for p in projects:
                pid = p["id"]
                req2 = urllib.request.Request(
                    f"https://console.neon.tech/api/v2/projects/{pid}/connection_uri",
                    headers={
                        "Authorization": f"Bearer {API_KEY}",
                        "Accept": "application/json"
                    }
                )
                try:
                    with urllib.request.urlopen(req2, context=ctx) as resp2:
                        conn_data = json.loads(resp2.read().decode())
                        uri = conn_data.get("uri", "N/A")
                        masked = uri
                        if "@" in uri and ":" in uri:
                            parts = uri.split("@")
                            user_pass = parts[0]
                            colon_idx = user_pass.rfind(":")
                            masked = user_pass[:colon_idx] + ":****@" + parts[1]
                        print(f"   ✅ Connection URI for '{p['name']}':")
                        print(f"      {masked}")
                        print(f"\n   Full URI (save to .env as DATABASE_URL):")
                        print(f"      {uri}")
                except Exception as e:
                    print(f"   ⚠️  Could not get connection URI: {e}")

                req3 = urllib.request.Request(
                    f"https://console.neon.tech/api/v2/projects/{pid}/branches",
                    headers={
                        "Authorization": f"Bearer {API_KEY}",
                        "Accept": "application/json"
                    }
                )
                try:
                    with urllib.request.urlopen(req3, context=ctx) as resp3:
                        branch_data = json.loads(resp3.read().decode())
                        branches = branch_data.get("branches", [])
                        print(f"\n   Branches ({len(branches)}):")
                        for b in branches:
                            print(f"      - {b['name']} (ID: {b['id']})")
                except Exception as e:
                    print(f"   ⚠️  Could not list branches: {e}")
        else:
            print("\n   No projects found. Create one at https://console.neon.tech")

except urllib.error.HTTPError as e:
    body = e.read().decode()
    print(f"   ❌ API Error (HTTP {e.code}): {body}")
except Exception as e:
    print(f"   ❌ Connection failed: {e}")

print("\n" + "=" * 50)
print("  TEST COMPLETE")
print("=" * 50)
