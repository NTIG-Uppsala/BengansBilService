from os import getcwd, path
from unittest import TestCase, main

from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By


class TestingPage(TestCase):
    dontCloseBrowser = False
    hideWindow = True

    @classmethod
    def setUpClass(cls):
        chr_options = Options()

        if cls.dontCloseBrowser:
            chr_options.add_experimental_option("detach", True)

        if cls.hideWindow:
            chr_options.add_argument("--headless")

        cls.browser = webdriver.Chrome(options=chr_options)

    # After the last test
    @classmethod
    def tearDownClass(cls):
        pass

    # Before each test
    def setUp(self):
        self.browser.get(path.join((getcwd()), "index.html"))

    # After each test
    def tearDown(self):
        self.browser.get("about:blank")

    def testNumber(self):
        self.assertIn("0630-555-555", self.browser.page_source)
        self.browser.find_element(By.LINK_TEXT, "0630-555-555")

    def testlinkNumber(self):
        self.assertIn("0630555555", self.browser.page_source)

    def testEmail(self):
        self.assertIn("info@ntig-uppsala.github.io", self.browser.page_source)
        self.browser.find_element(By.LINK_TEXT, "info@ntig‑uppsala.github.io")

    def testTitle(self):
        self.assertIn("Bengans Biluthyrning", self.browser.page_source)

    def testAddress(self):
        self.assertIn("Fjällgatan 32H", self.browser.page_source)
        self.assertIn("981 39 JÖNKÖPING", self.browser.page_source)

    def testOpeningHours(self):
        self.assertIn("Öppettider", self.browser.page_source)
        self.assertIn("Vardagar", self.browser.page_source)
        self.assertIn("10-16", self.browser.page_source)
        self.assertIn("Lördag", self.browser.page_source)
        self.assertIn("12-15", self.browser.page_source)
        self.assertIn("Söndag", self.browser.page_source)

    def testSocialmediaLinks(self):
        self.browser.find_element(By.ID, "Instagram")
        self.browser.find_element(By.ID, "X")
        self.browser.find_element(By.ID, "Facebook")

    def testCars(self):
        car_list = [
            {"car": "Audi A6", "model": "2011", "price": 800},
            {"car": "Renault Kadjar", "model": "2020", "price": 450},
            {"car": "Kia Soul", "model": "2020", "price": 400},
            {"car": "Subaru", "model": "2020", "price": 300},
            {"car": "Cadillac Escalade", "model": "1999", "price": 500},
            {"car": "Mitsubishi Outlander", "model": "2018", "price": 450},
            {"car": "Volvo XC40", "model": "2018", "price": 800},
            {"car": "VW Polo", "model": "2022", "price": 300},
            {"car": "Kia Carens", "model": "2022", "price": 400},
            {"car": "Audi S3", "model": "2015", "price": 450},
        ]

        for car_info in car_list:
            car = car_info["car"]
            model = car_info["model"]
            price = car_info["price"]

            self.assertIn(car, self.browser.page_source)
            self.assertIn(model, self.browser.page_source)
            self.assertIn(str(price), self.browser.page_source)

    def testImageLoading(self):
        image_elements = self.browser.find_elements(By.TAG_NAME, "img")

        for image_element in image_elements:
            is_loaded = self.browser.execute_script(
                "return arguments[0].complete && typeof arguments[0].naturalWidth != 'undefined' && arguments[0].naturalWidth > 0;",
                image_element,
            )

            if is_loaded:
                print(f"Image '{image_element.get_attribute('src')}' is loaded.")
            else:
                self.fail(
                    f"Image '{image_element.get_attribute('src')}' is not loaded."
                )

    def testliveOpenTimes(self):
        self.assertIn("Just nu", self.browser.page_source)

    def helperLiveOpening(self, date, results):
        self.browser.execute_script("setLiveOpeningHours(new Date('" + date + "'))")
        element = self.browser.find_element(By.CLASS_NAME, "storeState")
        self.assertIn(results, element.text)

    def testLiveOpeningHours(self):
        self.helperLiveOpening("2023-09-04T16:05:55", "Stängt")
        self.helperLiveOpening("2023-09-04T09:59:00", "Stängt")
        self.helperLiveOpening("2023-09-04T10:59:00", "Öppet")
        self.helperLiveOpening("2023-09-10T09:00:00", "Stängt")
        self.helperLiveOpening("2023-09-09T12:05:55", "Öppet")

    def testFooterTitle(self):
        self.assertIn("Kontakta&nbsp;oss", self.browser.page_source)
        self.assertIn("Adress", self.browser.page_source)
        self.assertIn("Öppettider", self.browser.page_source)

    def testSlideShowText(self):
        self.assertIn("Bra&nbsp;Bilar", self.browser.page_source)
        self.assertIn("Bättre&nbsp;Priser", self.browser.page_source)


# will run if the fil running is a normal python file
if __name__ == "__main__":
    main(verbosity=2)
