import urllib.request
import json
import ssl

def get_github_token():
    try:
        with open("../Tokens/Project_Token.txt", "r") as f:
            lines = f.readlines()
            for i, line in enumerate(lines):
                if line.strip() == "GitHub":
                    return lines[i+2].strip()
    except Exception as e:
        print(f"Error reading token: {e}")
    return None

API_KEY = get_github_token()

try:
    ctx = ssl.create_default_context()
    # Quick test to see if default context works
    urllib.request.urlopen("https://api.github.com", context=ctx, timeout=5)
except Exception:
    ctx = ssl._create_unverified_context()

print("=" * 50)
print("  GITHUB CONNECTION TEST")
print("=" * 50)

# Test 1: Get authenticated user info
print("\n[1] Testing GitHub API key (user info)...")
try:
    req = urllib.request.Request(
        "https://api.github.com/user",
        headers={
            "Authorization": f"Bearer {API_KEY}",
            "Accept": "application/vnd.github+json",
            "X-GitHub-Api-Version": "2022-11-28",
            "User-Agent": "TuitionManagementSystem"
        }
    )
    with urllib.request.urlopen(req, context=ctx) as resp:
        user = json.loads(resp.read().decode())
        print(f"   ✅ API connection successful!")
        print(f"   Username   : {user.get('login', 'N/A')}")
        print(f"   Name       : {user.get('name', 'N/A')}")
        print(f"   Email      : {user.get('email', 'N/A')}")
        print(f"   Public repos: {user.get('public_repos', 'N/A')}")
        print(f"   Profile    : {user.get('html_url', 'N/A')}")

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

# Test 2: List repositories
print("\n[2] Listing your repositories...")
try:
    req2 = urllib.request.Request(
        "https://api.github.com/user/repos?sort=updated&per_page=10",
        headers={
            "Authorization": f"Bearer {API_KEY}",
            "Accept": "application/vnd.github+json",
            "X-GitHub-Api-Version": "2022-11-28",
            "User-Agent": "TuitionManagementSystem"
        }
    )
    with urllib.request.urlopen(req2, context=ctx) as resp2:
        repos = json.loads(resp2.read().decode())
        print(f"   Found {len(repos)} recent repo(s):")
        if repos:
            for r in repos:
                visibility = "Private" if r.get("private") else "Public"
                print(f"      - {r.get('full_name','N/A')} [{visibility}]")
        else:
            print("   No repositories yet.")

except urllib.error.HTTPError as e:
    body = e.read().decode()
    print(f"   ⚠️  Could not list repos (HTTP {e.code}): {body}")
except Exception as e:
    print(f"   ⚠️  Could not list repos: {e}")

# Test 3: Check token scopes
print("\n[3] Checking token permissions...")
try:
    req3 = urllib.request.Request(
        "https://api.github.com/user",
        headers={
            "Authorization": f"Bearer {API_KEY}",
            "Accept": "application/vnd.github+json",
            "X-GitHub-Api-Version": "2022-11-28",
            "User-Agent": "TuitionManagementSystem"
        }
    )
    with urllib.request.urlopen(req3, context=ctx) as resp3:
        scopes = resp3.headers.get("X-OAuth-Scopes", "N/A")
        print(f"   Token scopes: {scopes}")
        resp3.read()

except Exception as e:
    print(f"   ⚠️  Could not check scopes: {e}")

print("\n" + "=" * 50)
print("  TEST COMPLETE")
print("=" * 50)
