## TO DO List

### Funcitonalities:
- [Paddle](https://www.paddle.com) integration for payment, tax and subscription
- Dashboard update:
    - subscription end
    - plan usage (number of menus)
    - traffic usage
- Cron job that will delete unused images from uploadthing
- Job that will save once per month overall analytics per user and delete events data from posthog analytics
- Integrate AI so they can upload a picture/PDF of their current menu and it will auto do them for them. (Would be a super cool concept and would attract more customers. My friend said he can help wil LLM integration)

### UI:
1. update navbar on desktop (decrease animations, make links bigger and more accessble)
2. decrease animations for pricing and buttons
3. refactors @/components/ui which are used in the app (buttons, labels, salect, etc.) - make variants that will cover most of our cases and delete inline class name when using those components
4. Update edit and create form with themes and images (in public folder images, in constants )
