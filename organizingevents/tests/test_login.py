from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.chrome.options import Options
import unittest
import time

class TestLogin(unittest.TestCase):
    def setUp(self):
        chrome_options = Options()
        chrome_options.add_argument("--start-maximized")
        chrome_options.add_argument("--disable-notifications")
        
        self.driver = webdriver.Chrome(options=chrome_options)
        self.wait = WebDriverWait(self.driver, 20)
        
    def tearDown(self):
        self.driver.quit()

    def test_login_page_loads(self):
        """Testimi që faqja e login-it ngarkohet"""
        self.driver.get("http://localhost:3000/login")
        time.sleep(2)
        
        # Kontrollojmë nëse elementet kryesore janë të pranishme
        email_input = self.driver.find_element(By.CSS_SELECTOR, 'input[placeholder="Email"]')
        password_input = self.driver.find_element(By.CSS_SELECTOR, 'input[placeholder="Password"]')
        login_button = self.driver.find_element(By.CSS_SELECTOR, ".inputButton")
        
        self.assertTrue(email_input.is_displayed())
        self.assertTrue(password_input.is_displayed())
        self.assertTrue(login_button.is_displayed())

    def test_navigation_to_register(self):
        """Testimi i navigimit nga login në register"""
        self.driver.get("http://localhost:3000/login")
        time.sleep(2)
        
        # Klikojmë butonin e register
        register_button = self.driver.find_element(By.CSS_SELECTOR, ".registerButton")
        register_button.click()
        
        # Kontrollojmë nëse jemi në faqen e register
        self.wait.until(EC.url_contains("/register"))
        self.assertIn("/register", self.driver.current_url)

    def test_navigation_to_forgot_password(self):
        """Testimi i navigimit nga login në forgot password"""
        self.driver.get("http://localhost:3000/login")
        time.sleep(2)
        
        # Klikojmë linkun e forgot password
        forgot_password = self.driver.find_element(By.CSS_SELECTOR, ".forgotContainer p")
        forgot_password.click()
        
        # Kontrollojmë nëse jemi në faqen e forgot password
        self.wait.until(EC.url_contains("/forgot-password"))
        self.assertIn("/forgot-password", self.driver.current_url)

if __name__ == "__main__":
    unittest.main() 