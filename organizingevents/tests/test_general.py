from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.chrome.options import Options
import unittest
import time

class TestGeneralFunctionality(unittest.TestCase):
    def setUp(self):
        chrome_options = Options()
        chrome_options.add_argument("--start-maximized")
        chrome_options.add_argument("--disable-notifications")
        
        self.driver = webdriver.Chrome(options=chrome_options)
        self.wait = WebDriverWait(self.driver, 20)
        
    def tearDown(self):
        self.driver.quit()

    def test_home_page_loads(self):
        """Testimi që faqja kryesore ngarkohet"""
        self.driver.get("http://localhost:3000/")
        time.sleep(2)
        
        # Kontrollojmë nëse elementet kryesore janë të pranishme
        navbar_container = self.driver.find_element(By.CLASS_NAME, "navbar-container")
        self.assertTrue(navbar_container.is_displayed())
        
        # Kontrollojmë nëse logo është e pranishme
        logo = self.driver.find_element(By.CLASS_NAME, "logo-home")
        self.assertTrue(logo.is_displayed())

    def test_navigation_menu(self):
        """Testimi i menysë së navigimit"""
        self.driver.get("http://localhost:3000/")
        time.sleep(2)
        
        # Testojmë navigimin në About Us
        about_link = self.driver.find_element(By.CSS_SELECTOR, "a[href='/aboutus']")
        about_link.click()
        self.wait.until(EC.url_contains("/aboutus"))
        
        # Testojmë navigimin në Contact
        contact_link = self.driver.find_element(By.CSS_SELECTOR, "a[href='/contact']")
        contact_link.click()
        self.wait.until(EC.url_contains("/contact"))
        
        # Testojmë navigimin në Staff List
        staff_link = self.driver.find_element(By.CSS_SELECTOR, "a[href='/stafflist']")
        staff_link.click()
        self.wait.until(EC.url_contains("/stafflist"))

    def test_protected_routes(self):
        """Testimi i rrugëve të mbrojtura"""
        # Testojmë aksesin në profile pa login
        self.driver.get("http://localhost:3000/profile")
        time.sleep(2)
        
        # Duhet të na ridrejtojë në login
        self.wait.until(EC.url_contains("/login"))
        
        # Testojmë aksesin në eventlist pa login
        self.driver.get("http://localhost:3000/eventlist")
        time.sleep(2)
        
        # Duhet të na ridrejtojë në login
        self.wait.until(EC.url_contains("/login"))

    def test_public_routes(self):
        """Testimi i rrugëve publike"""
        # Testojmë aksesin në About Us
        self.driver.get("http://localhost:3000/aboutus")
        time.sleep(2)
        self.assertIn("/aboutus", self.driver.current_url)
        
        # Testojmë aksesin në Contact
        self.driver.get("http://localhost:3000/contact")
        time.sleep(2)
        self.assertIn("/contact", self.driver.current_url)
        
        # Testojmë aksesin në Staff List
        self.driver.get("http://localhost:3000/stafflist")
        time.sleep(2)
        self.assertIn("/stafflist", self.driver.current_url)

    def test_responsive_design(self):
        """Testimi i dizajnit responsiv"""
        self.driver.get("http://localhost:3000/")
        time.sleep(2)
        
        # Testojmë në madhësi të ndryshme ekrani
        window_sizes = [(1920, 1080), (1366, 768), (768, 1024), (375, 812)]
        
        for width, height in window_sizes:
            self.driver.set_window_size(width, height)
            time.sleep(1)
            
            # Kontrollojmë nëse navbar container është i dukshëm
            navbar_container = self.driver.find_element(By.CLASS_NAME, "navbar-container")
            self.assertTrue(navbar_container.is_displayed())

if __name__ == "__main__":
    unittest.main() 