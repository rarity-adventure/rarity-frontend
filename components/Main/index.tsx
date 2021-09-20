const Main = ({ children }: { children: JSX.Element }) => (
    <main
        className={'flex flex-col items-center justify-start flex-grow w-full h-full'}
        style={{ height: 'max-content' }}
    >
        {children}
    </main>
)

export default Main
