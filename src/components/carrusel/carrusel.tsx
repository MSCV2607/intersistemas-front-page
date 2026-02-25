"use client";
import React, { useEffect, useState } from "react";
import styles from "./carrusel.module.css";

export interface Slide {
	title: string;
	text: string;
	imageSrc?: string;
	imageAlt?: string;
	buttonText?: string;
	buttonHref?: string;

	// per-slide visual overrides
	titleSize?: string | number;
	textSize?: string | number;
	imageScale?: string | number;
	cardHeight?: string | number;
	mediaHeight?: string | number;
}

interface CarruselProps {
	slides: Slide[];
	autoPlay?: boolean;
	interval?: number; // ms

	// visual overrides (passed from parent)
	titleSize?: string | number;
	textSize?: string | number;
	imageScale?: string | number; // e.g. '200%' or 2
	cardHeight?: string | number;
	mediaHeight?: string | number;
}

const Carrusel: React.FC<CarruselProps> = ({
	slides,
	autoPlay = false,
	interval = 6000,
	titleSize,
	textSize,
	imageScale,
	cardHeight,
	mediaHeight,
}) => {
	const [index, setIndex] = useState(0);

	useEffect(() => {
		if (!autoPlay || slides.length <= 1) return;
		const id = setInterval(() => {
			setIndex((i) => (i + 1) % slides.length);
		}, interval);
		return () => clearInterval(id);
	}, [autoPlay, interval, slides.length]);

	const prev = () => setIndex((i) => (i - 1 + slides.length) % slides.length);
	const next = () => setIndex((i) => (i + 1) % slides.length);

	if (!slides || slides.length === 0) return null;

	const slide = slides[index];

	const normalize = (v?: string | number, pxAsNumber = true) => {
		if (v === undefined) return undefined;
		if (typeof v === "number") return pxAsNumber ? `${v}px` : `${v}%`;
		return v;
	};

	// compute effective styles per slide when rendering below

	// per-slide effective styles (slide overrides parent props)
	const effCardH = normalize(slide.cardHeight ?? cardHeight, true);
	const cardStyle: React.CSSProperties | undefined = effCardH ? { height: effCardH } : undefined;

	const effTitle = normalize(slide.titleSize ?? titleSize, true);
	const titleStyle: React.CSSProperties | undefined = effTitle ? { fontSize: effTitle } : undefined;

	const effText = normalize(slide.textSize ?? textSize, true);
	const textStyle: React.CSSProperties | undefined = effText ? { fontSize: effText } : undefined;

	const effMediaH = normalize(slide.mediaHeight ?? mediaHeight, true);
	const mediaStyle: React.CSSProperties | undefined = effMediaH ? { height: effMediaH } : undefined;

	const effImageScale = slide.imageScale ?? imageScale;
	let imageStyle: React.CSSProperties | undefined = undefined;
	if (effImageScale !== undefined) {
		let widthVal: string;
		if (typeof effImageScale === "number") widthVal = `${effImageScale}%`;
		else widthVal = effImageScale;
		const marginLeft = typeof widthVal === "string" && widthVal.endsWith("%") ? `-${parseFloat(widthVal) / 2}%` : undefined;
		imageStyle = { width: widthVal, maxWidth: "none", marginLeft };
	}

	return (
		<div className={styles.carousel}>
			<div className={styles.card} style={cardStyle}>
				<div className={styles.content}>
					<h3 className={styles.kicker}>interSistemas:</h3>
					<h2 className={styles.title} style={titleStyle}>{slide.title}</h2>
					<p className={styles.text} style={textStyle}>{slide.text}</p>
					{slide.buttonText && (
						<a href={slide.buttonHref ?? "#"} className={styles.cta}>
							{slide.buttonText}
						</a>
					)}
				</div>

								<div className={styles.media} style={mediaStyle}>
									{slide.imageSrc ? (
										// Use a plain img so it works without Next/Image setup
										// Consumers can replace with Next/Image wrapper if desired
										<img src={slide.imageSrc} alt={slide.imageAlt ?? slide.title} className={styles.image} style={imageStyle} />
									) : (
										<div className={styles.placeholder} />
									)}
								</div>
			</div>

			<button className={styles.prev} aria-label="Anterior" onClick={prev}>
				‹
			</button>
			<button className={styles.next} aria-label="Siguiente" onClick={next}>
				›
			</button>

			<div className={styles.dots}>
				{slides.map((_, i) => (
					<button
						key={i}
						className={`${styles.dot} ${i === index ? styles.activeDot : ""}`}
						onClick={() => setIndex(i)}
						aria-label={`Ir al slide ${i + 1}`}>
					</button>
				))}
			</div>
		</div>
	);
};

export default Carrusel;

