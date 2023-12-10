import { motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import './index.scss';

import { PizzaAnimation } from '../../components/LottieAnimations/pizzaAnimation';
import { InicialPage } from '../../components/LottieAnimations/menuAnimation';
import { PerfilAnimation } from '../../components/LottieAnimations/accountAnimation';
import { SobreNos } from '../../components/LottieAnimations/SobreNos';

const Transition = ({ children }) => {
    const [isTransitioning, setTransitioning] = useState(true);

    useEffect(() => {
        const timeout = setTimeout(() => {
            setTransitioning(false);
        }, 300); // 1000 milissegundos = 1 segundo

        console.log(children)

        return () => clearTimeout(timeout);
    }, []);

    return (
        <>
            {children}
            <motion.div
                className='slide-in'
                initial={{ scaleY: 1 }}
                animate={{ scaleY: 0 }}
                exit={{ scaleY: 1 }}
                transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: isTransitioning ? 1 : 0 }}
            >
                {children.props.className === "leadingPage" ? <InicialPage /> : children.props.className === "cardapio" ? <PizzaAnimation /> :  children.props.className === "background-minhaconta" ? <PerfilAnimation/> : children.props.className === "App" ? <SobreNos/> : null}

                <h1 className={`${children.props.className === "App" ? "porteiro" : "titular"}`}>{children.props.className === "leadingPage" ? "Página Inicial" : children.props.className === "cardapio" ? "Cardapio" : children.props.className === "background-minhaconta" ? "Minha Conta" : children.props.className === "App" ? "Sobre Nos" : null}</h1>
            </motion.div>
        </>
    );
};

export default Transition;