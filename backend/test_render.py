import urllib.request
import json
import ssl

def get_render_token():
    try:
        with open("../Tokens/Project_Token.txt", "r") as f:
            lines = f.readlines()
            for i, line in enumerate(lines):
                if line.strip() == "Render":
                    return lines[i+2].strip()
    except Exception as e:
        print(f"Error reading token: {e}")
    return None

API_KEY = get_render_token()

ctx = ssl.create_default_context()

print("=" * 50)
print("  RENDER CONNECTION TEST")
print("=" * 50)

# Test 1: Get owner info
print("\n[1] Testing Render API key (owner info)...")
try:
    req = urllib.request.Request(
        "https://api.render.com/v1/owners",
        headers={
            "Authorization": f"Bearer {API_KEY}",
            "Accept": "application/json"
        }
    )
    with urllib.request.urlopen(req, context=ctx) as resp:
        data = json.loads(resp.read().decode())
        if data:
            for owner in data:
                o = owner.get("owner", owner)
                print(f"   ✅ API connection successful!")
                print(f"   Owner ID : {o.get('id', 'N/A')}")
                print(f"   Name     : {o.get('name', 'N/A')}")
                print(f"   Email    : {o.get('email', 'N/A')}")
                print(f"   Type     : {o.get('type', 'N/A')}")
        else:
            print(f"   ✅ API connection successful! (no owner details returned)")

except urllib.error.HTTPError as e:
    body = e.read().decode()
    print(f"   ❌ API Error (HTTP {e.code}): {body}")
    print("\n" + "=" * 50)
    print("  TEST COMPLETE")
    print("=" * 50)
    exit()
except Exception as e:
    print(f"   ❌ Connection failed: {e}")
    print("\n" + "=" * 50)
    print("  TEST COMPLETE")
    print("=" * 50)
    exit()

# Test 2: List services
print("\n[2] Listing Render services...")
try:
    req2 = urllib.request.Request(
        "https://api.render.com/v1/services",
        headers={
            "Authorization": f"Bearer {API_KEY}",
            "Accept": "application/json"
        }
    )
    with urllib.request.urlopen(req2, context=ctx) as resp2:
        data2 = json.loads(resp2.read().decode())
        if data2:
            print(f"   Found {len(data2)} service(s):")
            for s in data2:
                svc = s.get("service", s)
                print(f"      - {svc.get('name', 'N/A')} (Type: {svc.get('type', 'N/A')}, Status: {svc.get('suspended', 'N/A')})")
        else:
            print(f"   Found 0 service(s)")
            print("   No services yet. Ready to deploy!")

except urllib.error.HTTPError as e:
    body = e.read().decode()
    print(f"   ⚠️  Could not list services (HTTP {e.code}): {body}")
except Exception as e:
    print(f"   ⚠️  Could not list services: {e}")

print("\n" + "=" * 50)
print("  TEST COMPLETE")
print("=" * 50)
