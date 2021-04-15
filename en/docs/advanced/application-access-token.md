Before requesting authorization, API consumers obtain an application access token for the application that they registered. 

1. Once you register the application, generate an application access token using the following command: 
```
curl -X POST \
https://{APIM_HOST}:8243/token \
--cert <TRANSPORT_PUBLIC_KEY_FILE_PATH> --key <TRANSPORT_PRIVATE_KEY_FILE_PATH> \
-d 'grant_type=client_credentials&scope=accounts openid&client_assertion=eyJraWQiOiJEd01LZFdNbWo3UFdpbnZvcWZReVhWenlaN
lEiLCJhbGciOiJQUzI1NiJ9.eyJzdWIiOiJrYkxuSkpfdVFMMlllNjh1YUNSYlBJSk9SNFVhIiwiYXVkIjoiaHR0cHM6Ly9sb2NhbGhvc3Q6ODI0My90b2tl
biIsImlzcyI6ImtiTG5KSl91UUwyWWU2OHVhQ1JiUElKT1I0VWEiLCJleHAiOjE2Mzg3ODg0NDIsImlhdCI6MTYwMTk5Mjk2MSwianRpIjoiMTYwMTk5Mjk2
MSJ9.kWeV242yEXvF1vTntHsjxMfFqGAGIwiXQM1QeSTMoXyYePB450UZHZaVVo4_Q4SM9--FWQYCVKa7_SDMvmGcaiHeb5UTp0rdivMvVMZ1HkaYQRopC9c
eR3tSJbJ7J7XFKTEIUOqk6ehXZcQ9tTQDlaRHmL67y6s_XgTu_Gca3Q4ejEFQRr5JGGyzTimXdlqEfd3Lo6WD1I_s-c26tAuAJ00oGvAXOBPy0EoDFMdLDXv
-ZSAASZGYZr9F5s06qh5KHIY4rxQdr104dAalD-7pGhMwY2lwZymVlud73hCHfwq60fevra57HoVAD1hZVJ7hMf09QvlltLL6i3Gd4WzPXQ&client_asser
tion_type=urn%3Aietf%3Aparams%3Aoauth%3Aclient-assertion-type%3Ajwt-bearer&redirect_uri=www.wso2.com'
```
- The request payload contains a client assertion in the following format:
```xml
{
"alg": "<<The algorithm used for signing.>>",
"kid": "<<The thumbprint of the certificate.>>",
"typ": "JWT"
}
  
{
"iss": "<<This is the issuer of the token. For example, client ID of your application>>",
"sub": "<<This is the subject identifier of the issuer. For example, client ID of your application>>",
"exp": <<This is epoch time of the token expiration date/time>>,
"iat": <<This is epoch time of the token issuance date/time>>,
"jti": "<<This is an incremental unique value>>",
"aud": "<<This is the audience that the ID token is intended for. For example, https://{APIM_HOST}:8243/token>>"
}
  
<signature: For DCR, the client assertion is signed by the private key of the signing certificate. Otherwise the private
signature of the application certificate is used.>
```

2. The response contains an access token as follows:
```
{
   "access_token":"aa8ce78b-d81e-3385-81b1-a9fdd1e71daf",
   "scope":"accounts payments  openid",
   "id_token":"eyJ4NXQiOiJNell4TW1Ga09HWXdNV0kwWldObU5EY3hOR1l3WW1NNFpUQTNNV0kyTkRBelpHUXpOR00wWkdSbE5qSmtPREZrWkRSaU9URmtNV0ZoTXpVMlpHVmxOZyIsImtpZCI6Ik16WXhNbUZrT0dZd01XSTBaV05tTkRjeE5HWXdZbU00WlRBM01XSTJOREF6WkdRek5HTTBaR1JsTmpKa09ERmtaRFJpT1RGa01XRmhNelUyWkdWbE5nX1JTMjU2IiwiYWxnIjoiUlMyNTYifQ.eyJhdF9oYXNoIjoiaHVBcS1GbzB0N2pFZmtiZ1A4TkJwdyIsImF1ZCI6WyJrYkxuSkpfdVFMMlllNjh1YUNSYlBJSk9SNFVhIiwiaHR0cDpcL1wvb3JnLndzbzIuYXBpbWd0XC9nYXRld2F5Il0sInN1YiI6ImFkbWluQHdzbzIuY29tQGNhcmJvbi5zdXBlciIsIm5iZiI6MTYwMTk5MzA5OCwiYXpwIjoia2JMbkpKX3VRTDJZZTY4dWFDUmJQSUpPUjRVYSIsImFtciI6WyJjbGllbnRfY3JlZGVudGlhbHMiXSwic2NvcGUiOlsiYW1fYXBwbGljYXRpb25fc2NvcGUiLCJvcGVuaWQiXSwiaXNzIjoiaHR0cHM6XC9cL2xvY2FsaG9zdDo4MjQzXC90b2tlbiIsImV4cCI6MTYwMTk5NjY5OCwiaWF0IjoxNjAxOTkzMDk4fQ.cGdQ-9qK5JvKW32lK_PqhyJZyRb3r_86UPRFI2hlgiScnLYD8RsXDBNalmmnHiAbfb06e69QHQnmEKa6pcSSFWor0OAuzisBb6C5V51E9vH0eCr4hIa_lBtmjvLmsSue7puRUaYcyptwiuUkwjLFb-3_cpeuzWH29Knwne6zVD8gav_FPi1ub4vkrkX8ktLZH_JQG20fim1Ai5j2Q7jcnaMIHShYnC9sLBP5usp3thFLdQEyH8KCHJK79yNKzaruUntkq9yqqO_MQvY7VevLlDEDPllniRVih0r4TICdGrgJ0Ibr4wh_xFksVhYqa2_6x71ed_K9SX3hG-6T6pBUVA",
   "token_type":"Bearer",
   "expires_in":3600
}
```

