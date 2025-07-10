## TO DO List

### Funcitonalities:
- [Paddle](https://www.paddle.com) integration for payment, tax and subscription
- Dashboard update:
    - plan name
    - subscription end
    - billing page
    - plan usage (number of menus)
    - traffic usage
- Cron job that will delete unused images from uploadthing
- Job that will save once per month overall analytics per user and delete events data from posthog analytics

### UI:
1. **Transform layout 4 into caroseul** DONE
    - Improve deisgn (height, animation) DONE 
2. **Themes for digital catalogues (at least 4 themes)**
    - Apply variables to cards 1-4 DONE 
    - Define colors for themes (make it simple)DONE
    - (NEW) Do research and ADD CUSTOM FONTS FOR INDIVIDUAL THEMES + backgroung styles
3. **Responsive - Mobile First** DONE 
    - Reduce font sizes for mobile view + reduce size of image & card DONE 
4. SectionHeader.tsx improve design (maybe decrease gap)
4. Themes update
    - hsl => hex for all themes DONE 
    - create main product theme IN PROGRESS
    - add theme variables on contact, demo, home, cards, ui components (button, card, input, lablel, select => search with "@/components/ui"), in the end: admin* 
5. Update edit and create form with themes and images
6. Integrate AI so they can upload a picture/PDF of their current menu and it will auto do them for them. (Would be a super cool concept and would attract more customers. My friend said he can help wil LLM integration)
