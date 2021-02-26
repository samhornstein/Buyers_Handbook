from bs4 import BeautifulSoup
from obtain_amazon_product import obtain_reviews
import requests

# The webpage URL
# URL = "https://www.amazon.com/gp/product/B01GEDKEA2?pf_rd_r=BEYN6PNR342KZJTKK20A&pf_rd_p=5ae2c7f8-e0c6-4f35-9071-dc3240e894a8&pd_rd_r=d8d070a1-beac-47ee-8453-acd75c63fd6e&pd_rd_w=Kvl3L&pd_rd_wg=bhdAa&ref_=pd_gw_unk&th=1"
# URL = "https://www.amazon.com/Abahub-Surfboard-Shortboard-Carrying-Airplane/dp/B08313K1ZN/ref=sr_1_3_sspa?dchild=1&keywords=surfboard+bag&qid=1614284536&s=sporting-goods&sr=1-3-spons&psc=1&spLa=ZW5jcnlwdGVkUXVhbGlmaWVyPUExUDRIOEozTkkyMTJXJmVuY3J5cHRlZElkPUEwODA1Nzk0M0VEU1JSVUYxRlJENCZlbmNyeXB0ZWRBZElkPUEwMTc2OTc4M0JDSEEyTkE2VDZMUyZ3aWRnZXROYW1lPXNwX2F0ZiZhY3Rpb249Y2xpY2tSZWRpcmVjdCZkb05vdExvZ0NsaWNrPXRydWU="
URL = "https://www.amazon.com/OCEANBROAD-Surfboard-Longboard-Bag-100/dp/B0838FR3PW/ref=sr_1_1_sspa?dchild=1&keywords=surfboard%2Bbags&qid=1614300907&sr=8-1-spons&spLa=ZW5jcnlwdGVkUXVhbGlmaWVyPUEzOVVCS1Q5MTlWUVA3JmVuY3J5cHRlZElkPUEwNzY5NjE5SEVOMEhBSVNDUEdKJmVuY3J5cHRlZEFkSWQ9QTAyNjExMDM1Vko1UFdVM1JVSlYmd2lkZ2V0TmFtZT1zcF9hdGYmYWN0aW9uPWNsaWNrUmVkaXJlY3QmZG9Ob3RMb2dDbGljaz10cnVl&th=1&psc=1"

a, b, c = obtain_reviews(URL)

print(a)
print(b)
print(c)
