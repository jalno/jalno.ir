import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  docs: [
    {
      "docs": [
        {
          "type": "category",
          "label": "شروع",
          "link": {
            "type": "generated-index"
          },
          "collapsed": false,
          "items": [
            "installation",
            "options",
            "package"
          ]
        },
        {
          "type": "category",
          "label": "معماری",
          "link": {
            "type": "generated-index"
          },
          "items": [
            "lifecycle",
            "autoloader"
          ]
        },
        {
          "type": "category",
          "label": "مفاهیم پایه",
          "link": {
            "type": "generated-index"
          },
          "items": [
            "address",
            "routing",
            "translator",
            "controller",
            "view",
            "response",
            "validation",
            "form",
            "session",
            "client",
            "image",
            "events",
            "packageClass",
            "packagesClass"
          ]
        },
        {
          "type": "category",
          "label": "قالب",
          "link": {
            "type": "generated-index"
          },
          "items": [
            "frontend",
            "view_error",
            "dynamicData",
            "webpack",
            "npm",
            "node_webpack"
          ]
        },
        {
          "type": "category",
          "label": "امنیت",
          "link": {
            "type": "generated-index"
          },
          "items": [
            "password",
            "safe"
          ]
        },
        {
          "type": "category",
          "label": "مفاهیم تخصصی",
          "link": {
            "type": "generated-index"
          },
          "items": [
            "http",
            "json",
            "cache",
            "date",
            "process",
            "directory",
            "log",
            "cli",
            "ssh"
          ]
        },
        {
          "type": "category",
          "label": "پایگاه داده",
          "link": {
            "type": "generated-index"
          },
          "items": [
            "db",
            "dbObject",
            "pagination"
          ]
        },
        {
          "type": "category",
          "label": "آموزش ها",
          "link": {
            "type": "generated-index"
          },
          "items": [
            "naming",
            "create_new_database_table",
            "debug"
          ]
        }

      ]
    }
  ],
};

export default sidebars;
