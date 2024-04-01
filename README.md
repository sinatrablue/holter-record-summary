This is my subsmission for the Cardiologs homework !

## Usage and testing

To run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open the link provided in your console and play with my app ! (Please don't try to break it to hard because it will surely).

## Technical choices I made

I used the following stack to build this homework quick and easy and to make it easy to use/consult/edit

- [Next.js](https://nextjs.org/) - To have client and server in one place and to make the app compact and intuitive
- [React.js](https://react.dev) -  I'm used to it and I wanted to feel home with the Front-end dev
- [Bootstrap and React-Bootstrap](https://react-bootstrap.github.io) - Writting plain CSS wasn't part of the plan ! (I love it though)
- [Typescript]() - Do I really have to explain why ?

### Choices that were tempting

I thought about them with a stupid smile on my face and then convinced  myself it wasn't smart at all

- Angular Front + Ruby Back to be a crawler (but I don't know them yet)
- A Back-end in Rust (I miss Rust and hate it at the same time)


## Points to discuss or improve

- Obviously, **the interface is ugly** but I couldn't take the time to mock Cardiologs website or the real Holter platform

- I didn't take the first minute in consideration for the min/max heart rates, it seemed **irrelevant**. Was it really an extreme value ?

- Are my calculations really good ? I am quite happy with them ! Algorithm complexity for this delineation endpoint is *O(n)* in time, *n* being the number of lines in the CSV file ; *O(1)* in memory.

- Loading states are missing but I didn't want to add, for instance, **ReactQuery** to the project. Using **useDeferredValue** could've been a lighter option too but I have to stop now to spend a fair time on it, compared to others appliants.