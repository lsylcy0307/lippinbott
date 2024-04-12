from selenium import webdriver
from selenium.webdriver.common.by import By
from collections import deque
from selenium.common.exceptions import StaleElementReferenceException

driver = webdriver.Chrome()


def get_all_links(url, seen):
    try:
        driver.get(url)
        driver.implicitly_wait(2)
        links_elements = driver.find_elements(By.TAG_NAME, "a")
        new_links = []

        for element in links_elements:
            try:
                href = element.get_attribute('href')
                if href and href not in seen:
                    if href.__contains__("https://guides.library.upenn.edu/") and not href.__contains__("collapse"):
                        seen.add(href)
                        new_links.append(href)
            except StaleElementReferenceException:
                # Handle the case where the element reference becomes stale.
                # print("Encountered a stale element, skipping.")
                continue

        return new_links
    except Exception as e:
        # print(f"An error occurred: {e}")
        return []


def bfs_search(root):
    q = deque([root])
    seen = {root}
    while q:
        current = q.popleft()
        print(current)
        new_links = get_all_links(current, seen)
        q.extend(new_links)
    driver.quit()


root_url = 'https://guides.library.upenn.edu/hometabs/'
bfs_search(root_url)