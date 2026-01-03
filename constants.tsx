import React from 'react';
import { Terminal, Layers, Grid, Move, Copy, Settings, Zap, Monitor } from 'lucide-react';
import { Category } from './types';

// Standard Prefix notation
const PREFIX = 'Ctrl+b';

export const TMUX_DATA: Category[] = [
  {
    id: 'basics',
    title: '基础与设置',
    icon: <Terminal className="w-5 h-5" />,
    description: '启动 Tmux，恢复会话以及理解前缀键。',
    items: [
      {
        id: 'start-new',
        description: '新建会话',
        cmd: 'tmux',
        tags: ['start', 'init', 'open', '启动', '新建']
      },
      {
        id: 'start-named',
        description: '新建命名会话',
        cmd: 'tmux new -s [name]',
        note: '强烈建议为项目命名以便于管理。',
        tags: ['name', 'label', 'session', '命名', '会话']
      },
      {
        id: 'attach',
        description: '恢复最后会话',
        cmd: 'tmux a',
        tags: ['resume', 'open', 'back', '恢复', '连接']
      },
      {
        id: 'attach-named',
        description: '恢复指定会话',
        cmd: 'tmux a -t [name]',
        tags: ['resume', 'target', '恢复', '指定']
      },
      {
        id: 'prefix-explanation',
        description: '前缀键 (Prefix Key)',
        note: `大多数命令需要先按下 ${PREFIX}，松开后，再按具体的命令键。`,
        tags: ['meta', 'trigger', 'key', '前缀', '按键']
      }
    ]
  },
  {
    id: 'sessions',
    title: '会话管理 (Session)',
    icon: <Layers className="w-5 h-5" />,
    description: '管理多个独立的工作区。',
    items: [
      {
        id: 'list-sessions',
        description: '列出所有会话',
        cmd: 'tmux ls',
        shortcut: 's',
        tags: ['view', 'all', 'ls', '列表', '查看']
      },
      {
        id: 'rename-session',
        description: '重命名当前会话',
        shortcut: '$',
        tags: ['name', 'change', 'edit', '重命名', '修改']
      },
      {
        id: 'detach',
        description: '分离当前会话 (后台运行)',
        shortcut: 'd',
        note: '会话将在后台继续运行，不会被关闭。',
        tags: ['exit', 'background', 'leave', '分离', '退出']
      },
      {
        id: 'kill-session',
        description: '关闭指定会话',
        cmd: 'tmux kill-session -t [name]',
        tags: ['stop', 'end', 'delete', '关闭', '杀掉']
      }
    ]
  },
  {
    id: 'windows',
    title: '窗口 (Windows)',
    icon: <Monitor className="w-5 h-5" />,
    description: '类似浏览器的标签页。',
    items: [
      {
        id: 'new-window',
        description: '新建窗口',
        shortcut: 'c',
        tags: ['create', 'tab', 'add', '新建', '创建']
      },
      {
        id: 'rename-window',
        description: '重命名当前窗口',
        shortcut: ',',
        tags: ['name', 'change', 'label', '重命名']
      },
      {
        id: 'close-window',
        description: '关闭当前窗口',
        shortcut: '&',
        tags: ['kill', 'delete', 'remove', '关闭', '删除']
      },
      {
        id: 'next-window',
        description: '切换到下一个窗口',
        shortcut: 'n',
        tags: ['switch', 'move', 'forward', '下一个', '切换']
      },
      {
        id: 'prev-window',
        description: '切换到上一个窗口',
        shortcut: 'p',
        tags: ['switch', 'move', 'back', '上一个', '切换']
      },
      {
        id: 'find-window',
        description: '查找窗口',
        shortcut: 'f',
        tags: ['search', 'locate', '查找', '搜索']
      },
       {
        id: 'select-window',
        description: '选择窗口 0-9',
        shortcut: '0-9',
        tags: ['jump', 'goto', '选择', '跳转']
      }
    ]
  },
  {
    id: 'panes',
    title: '窗格 (Panes)',
    icon: <Grid className="w-5 h-5" />,
    description: '将一个窗口分割成多个终端区域。',
    items: [
      {
        id: 'split-vert',
        description: '左右分屏 (垂直)',
        shortcut: '%',
        note: '创建左右两个窗格。',
        tags: ['divide', 'side', 'vertical', '分屏', '垂直', '左右']
      },
      {
        id: 'split-horz',
        description: '上下分屏 (水平)',
        shortcut: '"',
        note: '创建上下两个窗格。',
        tags: ['divide', 'top', 'bottom', '分屏', '水平', '上下']
      },
      {
        id: 'close-pane',
        description: '关闭当前窗格',
        shortcut: 'x',
        tags: ['kill', 'remove', 'delete', '关闭', '删除']
      },
      {
        id: 'toggle-zoom',
        description: '切换窗格最大化',
        shortcut: 'z',
        note: '临时放大当前窗格，再次按下恢复。',
        tags: ['maximize', 'fullscreen', 'focus', '最大化', '放大']
      },
      {
        id: 'show-pane-numbers',
        description: '显示窗格编号',
        shortcut: 'q',
        tags: ['identify', 'index', '编号', '序号']
      },
      {
        id: 'convert-pane',
        description: '将窗格转换为窗口',
        shortcut: '!',
        tags: ['break', 'extract', 'move', '转换', '独立']
      }
    ]
  },
  {
    id: 'navigation',
    title: '导航与调整',
    icon: <Move className="w-5 h-5" />,
    description: '移动焦点和调整布局大小。',
    items: [
      {
        id: 'move-pane',
        description: '切换窗格焦点',
        shortcut: '方向键',
        tags: ['focus', 'switch', 'cursor', '移动', '焦点']
      },
      {
        id: 'resize-pane',
        description: '调整窗格大小',
        shortcut: 'Ctrl + 方向键',
        note: '按下前缀键后，按住 Ctrl 并点击方向键 (取决于配置)。',
        tags: ['size', 'bigger', 'smaller', '大小', '调整']
      },
      {
        id: 'swap-pane',
        description: '交换窗格位置',
        shortcut: '{ 或 }',
        tags: ['move', 'arrange', 'order', '交换', '位置']
      },
      {
        id: 'rotate-layout',
        description: '轮换标准布局',
        shortcut: 'Space (空格)',
        tags: ['layout', 'auto', 'arrange', '布局', '切换']
      }
    ]
  },
  {
    id: 'copy-mode',
    title: '复制模式',
    icon: <Copy className="w-5 h-5" />,
    description: '回滚历史记录并复制文本。',
    items: [
      {
        id: 'enter-copy',
        description: '进入复制/滚动模式',
        shortcut: '[',
        tags: ['scroll', 'history', 'read', '复制', '滚动']
      },
      {
        id: 'paste',
        description: '粘贴缓冲区内容',
        shortcut: ']',
        tags: ['insert', 'dump', '粘贴']
      },
      {
        id: 'search-forward',
        description: '向前搜索',
        note: '在复制模式下，按 /',
        tags: ['find', 'query', '搜索', '查找']
      },
      {
        id: 'search-backward',
        description: '向后搜索',
        note: '在复制模式下，按 ?',
        tags: ['find', 'query', '搜索', '查找']
      },
      {
        id: 'quit-copy',
        description: '退出复制模式',
        note: '按 q 键',
        tags: ['exit', 'escape', '退出']
      }
    ]
  },
  {
    id: 'recommended-config',
    title: '推荐配置 (Config)',
    icon: <Zap className="w-5 h-5" />,
    description: '常用的 .tmux.conf 优化设置。',
    items: [
      {
        id: 'conf-prefix',
        description: '修改前缀键为 Ctrl + a',
        cmd: 'set -g prefix C-a\nunbind C-b\nbind C-a send-prefix',
        note: 'Ctrl+b 距离太远，Ctrl+a 更顺手（需配置）。',
        tags: ['config', 'prefix', 'remap', '配置']
      },
      {
        id: 'conf-mouse',
        description: '开启鼠标支持',
        cmd: 'set -g mouse on',
        note: '允许使用鼠标选择窗格、调整大小和滚动。',
        tags: ['config', 'mouse', 'scroll', '鼠标']
      },
      {
        id: 'conf-index',
        description: '窗口/窗格索引从 1 开始',
        cmd: 'set -g base-index 1\nsetw -g pane-base-index 1',
        note: '0 键在键盘最右边，按起来不方便。',
        tags: ['config', 'index', 'number', '索引']
      },
      {
        id: 'conf-split',
        description: '更直观的分屏快捷键',
        cmd: 'bind | split-window -h\nbind - split-window -v',
        note: '使用 | 垂直分屏，- 水平分屏。',
        tags: ['config', 'split', 'bind', '分屏']
      },
      {
        id: 'conf-color',
        description: '开启 256 色支持',
        cmd: 'set -g default-terminal "screen-256color"',
        tags: ['config', 'color', 'terminal', '颜色']
      },
      {
        id: 'conf-reload',
        description: '快速重载配置文件',
        cmd: 'bind r source-file ~/.tmux.conf \\; display "Reloaded!"',
        tags: ['config', 'reload', 'bind', '重载']
      }
    ]
  },
  {
    id: 'misc',
    title: '杂项与配置',
    icon: <Settings className="w-5 h-5" />,
    description: '重载配置与帮助。',
    items: [
      {
        id: 'command-prompt',
        description: '进入命令提示符',
        shortcut: ':',
        tags: ['cmd', 'input', 'execute', '命令行']
      },
      {
        id: 'reload-config',
        description: '重载配置文件',
        cmd: 'tmux source ~/.tmux.conf',
        note: '或者在命令提示符下输入: :source-file ~/.tmux.conf',
        tags: ['refresh', 'update', 'settings', '重载', '刷新']
      },
      {
        id: 'list-keys',
        description: '列出所有快捷键',
        shortcut: '?',
        tags: ['help', 'keys', 'cheat', '帮助', '快捷键']
      }
    ]
  }
];