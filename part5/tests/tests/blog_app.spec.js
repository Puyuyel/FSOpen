const { test, expect, beforeEach, describe } = require('@playwright/test')
const { loginWith, createBlog } = require('./helper')

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('/api/testing/reset')
    await request.post('/api/users', {
      data: {
        name: 'Test User',
        username: 'testuser',
        password: 'test'
      }
    })
    await page.goto('')
  })

  test('Login form is shown', async ({ page }) => {
    const username = await page.getByTestId('username')
    const password = await page.getByTestId('password')

    await expect(username).toBeVisible()
    await expect(password).toBeVisible()
  })

  describe('Login', () => {
    test('succeeds with correct credentials', async ({ page }) => {
      await loginWith(page, 'testuser', 'test')

      await expect(page.getByText('Test User logged in')).toBeVisible()
    })

    test('fails with wrong credentials', async ({ page }) => {
      await loginWith(page, 'testuser', 'wrong')

      const errorDiv = page.locator('.notification.error')
      await expect(errorDiv).toContainText('wrong username or password')
      await expect(errorDiv).toHaveCSS('border-style', 'solid')
      await expect(errorDiv).toHaveCSS('color', 'rgb(255, 0, 0)')
      await expect(page.getByText('Test User logged in')).not.toBeVisible()
    })

    describe('When logged in', () => {
      beforeEach(async ({ page }) => {
        await loginWith(page, 'testuser', 'test')
      })
    
      test('a new blog can be created', async ({ page }) => {
        await createBlog(page, 'New Blog', 'Playwright', 'http://example.com')
        const newBlog = await page.getByText('New Blog Playwright')
        await expect(newBlog).toBeVisible()
      })

      describe('and a blog exists', () => {
        beforeEach(async ({ page }) => {
          await createBlog(page, 'Blog 1', 'Playwright', 'http://example.com')
        })
  
        test('the blog can be liked', async ({ page }) => {
          await page.getByText('Blog 1 Playwright')
  
          const viewButton = page.getByRole('button', { name: 'view' })
          await viewButton.click()

          const likeButton = page.getByRole('button', { name: 'like' })
          await likeButton.click()
  
          const likes = page.getByText('likes 1')
          await expect(likes).toBeVisible()
        })

        test('the blog can be deleted by the user who created it', async ({ page }) => {
          const viewButton = page.getByRole('button', { name: 'view' })
          await viewButton.click()

          const deleteButton = page.getByRole('button', { name: 'remove' })
          page.once('dialog', dialog => dialog.accept())
          await deleteButton.click()

          await expect(page.getByText('Blog 1 Playwright')).not.toBeVisible()
        })
        
        test('only the creator can see the delete button', async ({ page, browser }) => {
          const context = await browser.newContext()
          const otherPage = await context.newPage()

          await otherPage.goto('')
          await otherPage.request.post('/api/users', {
            data: {
              name: 'Other User',
              username: 'otheruser',
              password: 'other'
            }
          })

          await loginWith(otherPage, 'otheruser', 'other')

          await otherPage.getByText('Blog 1 Playwright')
          const viewButton = otherPage.getByRole('button', { name: 'view' })
          await viewButton.click()

          const deleteButton = otherPage.getByRole('button', { name: 'remove' })
          await expect(deleteButton).not.toBeVisible()

          await context.close()
        })

        test('blogs are ordered according to likes', async ({ page }) => {
          await createBlog(page, 'Blog 2', 'Playwright', 'http://example.com')
          await createBlog(page, 'Blog 3', 'Playwright', 'http://example.com')

          const viewButtons = page.getByRole('button', { name: 'view' })
          const count = await viewButtons.count()
          for (let i = 0; i < count; i++) {
            await viewButtons.first().click()
          }

          const likeButtons = page.getByRole('button', { name: 'like' })
          await likeButtons.nth(1).click();
          await page.waitForTimeout(500);
          await likeButtons.nth(0).click();
          await page.waitForTimeout(500);
          await likeButtons.nth(2).click();
          await page.waitForTimeout(500);

          const blogs = page.getByText('Playwright')
          const firstBlog = await blogs.nth(0).textContent()
          const secondBlog = await blogs.nth(1).textContent()
          const thirdBlog = await blogs.nth(2).textContent()

          expect(firstBlog).toContain('Blog 2')
          expect(secondBlog).toContain('Blog 3')
          expect(thirdBlog).toContain('Blog 1')
        })
      })
    })
  })
})