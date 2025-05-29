from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.chrome.options import Options
import unittest
import time

class TestRegister(unittest.TestCase):
    def setUp(self):
        chrome_options = Options()
        chrome_options.add_argument("--start-maximized")
        chrome_options.add_argument("--disable-notifications")
        
        self.driver = webdriver.Chrome(options=chrome_options)
        self.wait = WebDriverWait(self.driver, 20)
        
    def tearDown(self):
        self.driver.quit()

    def test_register_page_loads(self):
        """Testimi që faqja e regjistrimit ngarkohet"""
        self.driver.get("http://localhost:3000/register")
        time.sleep(2)
        
        # Kontrollojmë nëse elementet kryesore janë të pranishme
        name_input = self.driver.find_element(By.CSS_SELECTOR, 'input[placeholder="Name"]')
        surname_input = self.driver.find_element(By.CSS_SELECTOR, 'input[placeholder="Surname"]')
        email_input = self.driver.find_element(By.CSS_SELECTOR, 'input[placeholder="Email"]')
        password_input = self.driver.find_element(By.CSS_SELECTOR, 'input[placeholder="Password"]')
        confirm_password_input = self.driver.find_element(By.CSS_SELECTOR, 'input[placeholder="Confirm password"]')
        register_button = self.driver.find_element(By.CSS_SELECTOR, ".inputButton")
        
        self.assertTrue(name_input.is_displayed())
        self.assertTrue(surname_input.is_displayed())
        self.assertTrue(email_input.is_displayed())
        self.assertTrue(password_input.is_displayed())
        self.assertTrue(confirm_password_input.is_displayed())
        self.assertTrue(register_button.is_displayed())

    def test_navigation_to_login(self):
        """Testimi i navigimit nga register në login"""
        self.driver.get("http://localhost:3000/register")
        time.sleep(2)
        
        # Klikojmë butonin e login
        login_button = self.driver.find_element(By.CSS_SELECTOR, ".loginButton")
        login_button.click()
        
        # Kontrollojmë nëse jemi në faqen e login
        self.wait.until(EC.url_contains("/login"))
        self.assertIn("/login", self.driver.current_url)

if __name__ == "__main__":
    unittest.main() 