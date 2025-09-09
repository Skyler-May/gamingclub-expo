# Welcome to your Expo app 👋

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Get started

1. Install dependencies

   ```bash
   pnpm install
   ```

2. Start the app

   ```bash
   pnpm expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Get a fresh project

When you're ready, run:

```bash
pnpm run reset-project
```

This command will move the starter code to the **app-example** directory and create a blank **app** directory where you can start developing.

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

## Join the community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.

```
GameClub
├─ app
│  ├─ (tabs)
│  │  ├─ game.tsx
│  │  ├─ index.tsx
│  │  ├─ profile.tsx
│  │  ├─ wallet.tsx
│  │  └─ _layout.tsx
│  ├─ chat
│  │  └─ index.tsx
│  ├─ create-account.tsx
│  ├─ fuli
│  │  └─ index.tsx
│  ├─ lottery
│  │  ├─ hong-kong
│  │  │  └─ index.tsx
│  │  ├─ macau
│  │  │  └─ index.tsx
│  │  ├─ new-macau
│  │  │  └─ index.tsx
│  │  └─ taiwan
│  │     └─ index.tsx
│  ├─ modal.tsx
│  ├─ settings
│  │  ├─ index.tsx
│  │  ├─ legal
│  │  │  └─ index.tsx
│  │  ├─ personal-info
│  │  │  └─ index.tsx
│  │  └─ security-center
│  │     └─ index.tsx
│  ├─ sign-in.tsx
│  ├─ test.tsx
│  └─ _layout.tsx
├─ app.json
├─ assets
│  ├─ fonts
│  │  └─ SpaceMono-Regular.ttf
│  └─ images
│     ├─ adaptive-icon.png
│     ├─ favicon.png
│     ├─ icon.png
│     ├─ partial-react-logo.png
│     ├─ react-logo.png
│     ├─ react-logo@2x.png
│     ├─ react-logo@3x.png
│     ├─ slide-images
│     │  ├─ purple-0.png
│     │  ├─ purple-1.png
│     │  ├─ purple-2.png
│     │  ├─ purple-3.png
│     │  ├─ purple-4.png
│     │  └─ purple-5.png
│     └─ splash-icon.png
├─ babel.config.js
├─ components
│  ├─ AppGameplayOptions.tsx
│  ├─ Buttons
│  │  ├─ AnimalButtonsPanel.tsx
│  │  ├─ NumberAnimalSelector.tsx
│  │  └─ SubmitButton.tsx
│  ├─ Carousel
│  │  ├─ Fold
│  │  │  ├─ FoldCarousel.tsx
│  │  │  ├─ get-images.ts
│  │  │  └─ sizes.ts
│  │  ├─ purple-images.ts
│  │  ├─ render-item.tsx
│  │  ├─ SeamlessCarousel.tsx
│  │  └─ SlideItem.tsx
│  ├─ HelloWave.tsx
│  ├─ QuickButton.tsx
│  ├─ ThemeToggle.tsx
│  ├─ ui
│  │  ├─ AccountDetails.tsx
│  │  ├─ Balance.tsx
│  │  ├─ BankCards.tsx
│  │  ├─ BigSmallOddEvenPanel.tsx
│  │  ├─ ButtonsGroup.tsx
│  │  ├─ CategoryTabs.tsx
│  │  ├─ GameCard.tsx
│  │  ├─ GameplayToggle.tsx
│  │  ├─ GetLotteryResults.tsx
│  │  ├─ QuickButtonUI.tsx
│  │  ├─ ThirdPartyAccounts.tsx
│  │  ├─ ToolCards.tsx
│  │  └─ UserInfoCard.tsx
│  └─ __test__
│     └─ Test.tsx
├─ constants
│  ├─ animalAgeMapTest.ts
│  ├─ Colors.ts
│  ├─ game-data.ts
│  ├─ lunarData.ts
│  ├─ moApiUrl.ts
│  └─ profileCard.ts
├─ context
│  └─ AuthContext.tsx
├─ docs
│  ├─ app.md
│  ├─ BigSmallOddEvenPanel.md
│  └─ data.md
├─ eslint.config.js
├─ features
│  ├─ BSOE-Panel
│  │  ├─ handleClear.ts
│  │  ├─ handleSelectAll.ts
│  │  ├─ handleSelectBig.ts
│  │  ├─ handleSelectEven.ts
│  │  ├─ handleSelectOdd.ts
│  │  ├─ handleSelectSmall.ts
│  │  └─ toggleAnimalsPanel.ts
│  ├─ handleSelectAnimal .ts
│  └─ quickButtonLogic.ts
├─ hooks
│  ├─ Lunar
│  │  ├─ useLunar.ts
│  │  ├─ useSolar.ts
│  │  └─ useZodiacAge.ts
│  ├─ useBigSmallOddEvenPanel.ts
│  ├─ useButtonGroupLayout.ts
│  ├─ useCountdown.ts
│  ├─ useMoLotteryResults.ts
│  ├─ useQuickButtonHook.ts
│  └─ useStorageState.ts
├─ metro.config.js
├─ package.json
├─ pnpm-lock.yaml
├─ pnpm-workspace.yaml
├─ README.md
├─ tsconfig.json
├─ types
│  ├─ auth
│  │  ├─ api.ts
│  │  ├─ authService.ts
│  │  └─ client.ts
│  ├─ game-card.ts
│  ├─ game-play.ts
│  ├─ mo-api.ts
│  └─ user.ts
└─ utils
   ├─ animalAgeMap.ts
   ├─ authStore.ts
   ├─ buttonGroupStyles.ts
   ├─ game-routes.ts
   └─ Themed.ts

```