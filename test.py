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

    
# denna bit finns här så att testerna körs om filen körs som vanligt python-program
if __name__ == '__main__':
    main(verbosity=2)