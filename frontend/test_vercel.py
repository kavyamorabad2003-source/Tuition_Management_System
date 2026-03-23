import urllib.request
import json
import ssl

def get_vcp_token():
    try:
        with open("../Tokens/Project_Token.txt", "r") as f:
            lines = f.readlines()
            for i, line in enumerate(lines):
                if line.strip() == "Vercel":
                    return lines[i+2].strip()
    except Exception as e:
        print(f"Error reading token: {e}")
    return None

API_KEY = get_vcp_token()

ctx = ssl.create_default_context()

print("=" * 50)
print("  VERCEL CONNECTION TEST")
print("=" * 50)

# Test 1: Get user info
print("\n[1] Testing Vercel API key (user info)...")
try:
    req = urllib.request.Request(
        "https://api.vercel.com/v2/user",
        headers={
            "Authorization": f"Bearer {API_KEY}",
            "Accept": "application/json"
        }
    )
    with urllib.request.urlopen(req, context=ctx) as resp:
        data = json.loads(resp.read().decode())
        user = data.get("user", {})
        print(f"   ✅ API connection successful!")
        print(f"   Username : {user.get('username', 'N/A')}")
        print(f"   Name     : {user.get('name', 'N/A')}")
        print(f"   Email    : {user.get('email', 'N/A')}")

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

# Test 2: List projects
print("\n[2] Listing Vercel projects...")
try:
    req2 = urllib.request.Request(
        "https://api.vercel.com/v9/projects",
        headers={
            "Authorization": f"Bearer {API_KEY}",
            "Accept": "application/json"
        }
    )
    with urllib.request.urlopen(req2, context=ctx) as resp2:
        data2 = json.loads(resp2.read().decode())
        projects = data2.get("projects", [])
        print(f"   Found {len(projects)} project(s):")
        if projects:
            for p in projects:
                print(f"      - {p.get('name', 'N/A')} (Framework: {p.get('framework', 'N/A')})")
        else:
            print("   No projects yet. Ready to deploy!")

except urllib.error.HTTPError as e:
    body = e.read().decode()
    print(f"   ⚠️  Could not list projects (HTTP {e.code}): {body}")
except Exception as e:
    print(f"   ⚠️  Could not list projects: {e}")

# Test 3: List teams
print("\n[3] Checking teams...")
try:
    req3 = urllib.request.Request(
        "https://api.vercel.com/v2/teams",
        headers={
            "Authorization": f"Bearer {API_KEY}",
            "Accept": "application/json"
        }
    )
    with urllib.request.urlopen(req3, context=ctx) as resp3:
        data3 = json.loads(resp3.read().decode())
        teams = data3.get("teams", [])
        print(f"   Found {len(teams)} team(s):")
        for t in teams:
            print(f"      - {t.get('name', 'N/A')} (slug: {t.get('slug', 'N/A')})")
        if not teams:
            print("   Personal account (no teams)")

except urllib.error.HTTPError as e:
    body = e.read().decode()
    print(f"   ⚠️  Could not list teams (HTTP {e.code}): {body}")
except Exception as e:
    print(f"   ⚠️  Could not list teams: {e}")

print("\n" + "=" * 50)
print("  TEST COMPLETE")
print("=" * 50)
