/* eslint-disable no-underscore-dangle */

import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { Router, useRouter } from 'next/router';
import Button from '@material-ui/core/Button';
import { pathnameToLanguage } from 'docs/src/modules/utils/helpers';

const SOURCE_CODE_ROOT_URL = 'https://github.com/mui-org/material-ui/edit/master';

export default function EditPage(props) {
  const { markdownLocation } = props;
  const { t, userLanguage } = useSelector(state => ({
    t: state.options.t,
    userLanguage: state.options.userLanguage,
  }));
  const router = useRouter();
  const { canonical } = pathnameToLanguage(Router._rewriteUrlForNextExport(router.asPath));

  return (
    <Button
      component={userLanguage === 'en' ? 'a' : 'button'}
      onClick={() => {
        if (userLanguage === 'en') {
          return;
        }
        window.location = `/aa${canonical}`;
      }}
      href={userLanguage === 'en' ? `${SOURCE_CODE_ROOT_URL}${markdownLocation}` : null}
      target="_blank"
      rel="noopener nofollow"
      size="small"
      data-ga-event-category={userLanguage === 'en' ? undefined : 'l10n'}
      data-ga-event-action={userLanguage === 'en' ? undefined : 'edit-button'}
      data-ga-event-label={userLanguage === 'en' ? undefined : userLanguage}
    >
      {t('editPage')}
    </Button>
  );
}

EditPage.propTypes = {
  markdownLocation: PropTypes.string.isRequired,
};
