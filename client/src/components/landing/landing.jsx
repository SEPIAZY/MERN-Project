import React, { memo } from 'react';

import resets from '../_resets.module.css';
import classes from './landing.module.css';
import { polygon } from './polygon.jsx';

export const landing = memo(function landing(props) {
  return (
    <div className={`${resets.clapyResets} ${classes.root}`}>
      <div className={classes.bER}>BE@R</div>
      <div className={classes.collection}>Collection</div>
      <div className={classes.qRCode}>QR code</div>
      <div className={classes.social}>Social</div>
      <div className={classes.welcomeToBERBRICKWorld}>Welcome to BE@RBRICK world</div>
      <div className={classes.heroContent}>
        <div className={classes.shareTheWorldWithYourBERBRICKC}>
          <div className={classes.textBlock}>Share the world with</div>
          <div className={classes.textBlock2}>your BE@RBRICK collection</div>
        </div>
        <div className={classes.create}>
          <div className={classes.rectangle70}></div>
          <div className={classes.createCollection}>Create collection</div>
        </div>
        <div className={classes.seeOtherProfileFreeForUsing}>see other profile | free for using</div>
      </div>
      <div className={classes.rectangle69}></div>
      <div className={classes.signIn}>Sign in</div>
      <div className={classes.eN}>EN</div>
      <div className={classes.polygon1}>
        <polygon className={classes.icon} />
      </div>
    </div>
  );
});
