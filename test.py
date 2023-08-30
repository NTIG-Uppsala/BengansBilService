from unittest import TestCase, main
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.options import Options
from os import path, getcwd



class TestHemsida(TestCase):

    # inställningar för hur testerna körs
    stangintebrowsern = False  # om True så hålls webbläsaren öppen efter testerna är klara, annars stängs den
    gomfonstret = True  # visar webbläsaren medan testerna körs

    # setUpClass körs INNAN FÖRSTA testet
    @classmethod
    def setUpClass(cls):
        chr_options = Options()

        if cls.stangintebrowsern:
            chr_options.add_experimental_option("detach", True)

        if cls.gomfonstret:
            chr_options.add_argument("--headless")

        cls.browser = webdriver.Chrome(options=chr_options)
        

    # tearDownClass körs EFTER SISTA testet
    @classmethod
    def tearDownClass(cls):
        pass  # gör ingenting

    # setUp körs INNAN VARJE TEST
    def setUp(self):
        self.browser.get(path.join((getcwd()), 'index.html'))

    # tearDown körs EFTER VARJE TEST
    def tearDown(self):
        self.browser.get('about:blank')  # gå till en tom sida för att undvika att tidigare test påverkar senare


    # HÄR BÖRJAR TESTERNA
    def testNumber(self):
        self.assertIn("0630-555-555", self.browser.page_source)
        self.browser.get(path.join((getcwd()), 'index.html'))
        self.browser.find_element(By.LINK_TEXT, "0630-555-555").click()

    def testlinkNumber(self):
        self.assertIn("0630555555", self.browser.page_source)

    def testEmail(self):
       self.assertIn("info@ntig-uppsala.github.io",self.browser.page_source)
       self.browser.get(path.join((getcwd()), 'index.html'))
       self.browser.find_element(By.LINK_TEXT, "info@ntig‑uppsala.github.io").click()


    def testTitleExist(self):
        self.assertIn("Bengans Biluthyrning",self.browser.page_source)

    def testAdress(self):
        self.assertIn("Fjällgatan 32H",self.browser.page_source)
        self.assertIn("981 39 JÖNKÖPING",self.browser.page_source)

    def testOpeningHours(self):
        self.assertIn("Öppettider",self.browser.page_source)
        self.assertIn("Måndag 10-16",self.browser.page_source)
        self.assertIn("Tisdag 10-16",self.browser.page_source)
        self.assertIn("Onsdag 10-16",self.browser.page_source)
        self.assertIn("Torsdag 10-16",self.browser.page_source)
        self.assertIn("Fredag 10-16",self.browser.page_source)
        self.assertIn("Lördag 12-15",self.browser.page_source)
        self.assertIn("Söndag",self.browser.page_source)

    def testSocialmediaLinks(self):
        self.browser.get(path.join((getcwd()), 'index.html'))
        self.browser.find_element(By.ID, "Instagram").click()
        self.browser.find_element(By.ID, "X").click()
        self.browser.find_element(By.ID, "Facebook").click()

    def testcars(self):
        car_list = [
            {'car': 'Audi A6', 'model': '2011', 'price': 800},
            {'car': 'Renault Kadjar', 'model': '2016', 'price': 450},
            {'car': 'Kia Soul', 'model': '2020', 'price': 400},
            {'car': 'Subaru','model':'2020','price':300},
            {'car': 'Caddilac Escalade','model':'1999','price':500},
            {'car': 'Mitsubichi Outlander','model':'2018','price':450},
            {'car': 'Volvo XC40','model':'2018','price':800},
            {'car': 'VW Polo','model':'2022','price':300},
            {'car': 'Kia Carens','model':'2022','price':400},
            {'car': 'Audi S3','model':'2015','price':450},

        ]

        for car_info in car_list:
            car = car_info['car']
            model = car_info['model']
            price = car_info['price']

            self.assertIn(car, self.browser.page_source)
            self.assertIn(model, self.browser.page_source)
            self.assertIn(str(price), self.browser.page_source) 

                
        

    
# denna bit finns här så att testerna körs om filen körs som vanligt python-program
if __name__ == '__main__':
    main(verbosity=2)