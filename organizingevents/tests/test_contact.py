from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.chrome.options import Options
import unittest
import time

class TestContact(unittest.TestCase):
    def setUp(self):
        chrome_options = Options()
        chrome_options.add_argument("--start-maximized")
        chrome_options.add_argument("--disable-notifications")
        
        self.driver = webdriver.Chrome(options=chrome_options)
        self.wait = WebDriverWait(self.driver, 20)
        
    def tearDown(self):
        self.driver.quit()

    def test_contact_page_loads(self):
        """Testimi që faqja e kontaktit ngarkohet"""
        self.driver.get("http://localhost:3000/contact")
        time.sleep(2)
        
        # Kontrollojmë nëse elementet kryesore janë të pranishme
        name_input = self.driver.find_element(By.ID, "name")
        email_input = self.driver.find_element(By.ID, "email")
        message_input = self.driver.find_element(By.ID, "message")
        send_button = self.driver.find_element(By.CSS_SELECTOR, ".btn-contact")
        
        self.assertTrue(name_input.is_displayed())
        self.assertTrue(email_input.is_displayed())
        self.assertTrue(message_input.is_displayed())
        self.assertTrue(send_button.is_displayed())

    def test_contact_form_required_fields(self):
        """Testimi që fushat e formës së kontaktit janë të detyrueshme"""
        self.driver.get("http://localhost:3000/contact")
        time.sleep(2)
        
        # Kontrollojmë nëse fushat janë të detyrueshme
        name_input = self.driver.find_element(By.ID, "name")
        email_input = self.driver.find_element(By.ID, "email")
        message_input = self.driver.find_element(By.ID, "message")
        
        self.assertEqual(name_input.get_attribute("required"), "true")
        self.assertEqual(email_input.get_attribute("required"), "true")
        self.assertEqual(message_input.get_attribute("required"), "true")

if __name__ == "__main__":
    unittest.main() 