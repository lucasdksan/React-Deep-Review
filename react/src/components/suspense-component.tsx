import { Suspense, useEffect, useState } from "react";

const LazyHeader = () => (<header>Header</header>);

const DelayedFallback = ({ delay, children }: { delay: number; children: React.ReactNode }) => {
    const [showFallback, setShowFallback] = useState(false);

    useEffect(() => {
        const timeout = setTimeout(() => setShowFallback(true), delay);
        return () => clearTimeout(timeout);
    }, [delay]);

    return showFallback ? children : null;
};

export const SuspenseComponent = () => {
    return (
        <Suspense fallback={<DelayedFallback delay={1500}><div>Carregando...</div></DelayedFallback>}>
            <LazyHeader />
        </Suspense>
    );
}