'use client';

import React, { ReactNode } from 'react';
import { StyleProvider, createCache, extractStyle } from '@ant-design/cssinjs';
import { useServerInsertedHTML } from 'next/navigation';

const StyledComponentsRegistry = ({ children }: { children: ReactNode }) => {
	const cache = createCache();
	useServerInsertedHTML(() => (
		<style
			id="antd"
			dangerouslySetInnerHTML={{ __html: extractStyle(cache, true) }}
		/>
	));
	return (
		<StyleProvider hashPriority="high" cache={cache}>
			{children}
		</StyleProvider>
	);
};

export default StyledComponentsRegistry;
