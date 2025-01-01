base = "https://jwe0.github.io/jwe0-tracker"

username = input("Username: ")
webhook  = input("Webhook: ")

id = webhook.split("https://discord.com/api/webhooks/")[1].split("/")[0]
token    = webhook.split("https://discord.com/api/webhooks/")[1].split("/")[1]

secret = token + id + username + str(len(token)) + "|" + str(len(id))

url = base + "?username=" + username + "&secret=" + secret

print(url)
