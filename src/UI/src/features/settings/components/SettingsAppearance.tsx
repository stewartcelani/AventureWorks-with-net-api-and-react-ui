import { useTheme } from '@providers/ThemeProvider';
import { Separator } from '@components/ui/separator.tsx';
import { cn } from '@/lib/utils';

export default function SettingsAppearance() {
  const { theme, setTheme } = useTheme();

  return (
    <>
      <div>
        <h3 className="pb-1 text-2xl font-bold tracking-tight text-foreground/90">Appearance</h3>
        <p className="text-muted-foreground">Customize the appearance of the app.</p>
      </div>
      <Separator className="my-6" />
      <div>
        <label className="text-sm font-medium leading-none">Name</label>
        <p className="text-[0.8rem] text-muted-foreground">Select the theme.</p>
        <div className="grid max-w-md grid-cols-2 gap-8 pt-2">
          <div>
            <div
              onClick={() => setTheme('light')}
              className={cn(
                'cursor-pointer items-center rounded-md border-2 border-muted bg-popover p-1',
                theme === 'light' ? 'bg-primary/80' : 'hover:bg-primary/50 hover:text-accent-foreground'
              )}
            >
              <div className="space-y-2 rounded-sm bg-[#ecedef] p-2">
                <div className="space-y-2 rounded-md bg-white p-2 shadow-sm">
                  <div className="h-2 w-[80px] rounded-lg bg-[#ecedef]" />
                  <div className="h-2 w-[100px] rounded-lg bg-[#ecedef]" />
                </div>
                <div className="flex items-center space-x-2 rounded-md bg-white p-2 shadow-sm">
                  <div className="size-4 rounded-full bg-[#ecedef]" />
                  <div className="h-2 w-[100px] rounded-lg bg-[#ecedef]" />
                </div>
                <div className="flex items-center space-x-2 rounded-md bg-white p-2 shadow-sm">
                  <div className="size-4 rounded-full bg-[#ecedef]" />
                  <div className="h-2 w-[100px] rounded-lg bg-[#ecedef]" />
                </div>
              </div>
            </div>
            <span className="block w-full p-2 text-center font-normal">Light</span>
          </div>
          <div>
            <div
              onClick={() => setTheme('dark')}
              className={cn(
                'cursor-pointer items-center rounded-md border-2 border-muted bg-popover p-1',
                theme === 'dark' ? 'bg-primary/80' : 'hover:bg-primary/50 hover:text-accent-foreground'
              )}
            >
              <div className="space-y-2 rounded-sm bg-slate-950 p-2">
                <div className="space-y-2 rounded-md bg-slate-800 p-2 shadow-sm">
                  <div className="h-2 w-[80px] rounded-lg bg-slate-400" />
                  <div className="h-2 w-[100px] rounded-lg bg-slate-400" />
                </div>
                <div className="flex items-center space-x-2 rounded-md bg-slate-800 p-2 shadow-sm">
                  <div className="size-4 rounded-full bg-slate-400" />
                  <div className="h-2 w-[100px] rounded-lg bg-slate-400" />
                </div>
                <div className="flex items-center space-x-2 rounded-md bg-slate-800 p-2 shadow-sm">
                  <div className="size-4 rounded-full bg-slate-400" />
                  <div className="h-2 w-[100px] rounded-lg bg-slate-400" />
                </div>
              </div>
            </div>
            <span className="block w-full p-2 text-center font-normal">Dark</span>
          </div>
        </div>
      </div>
    </>
  );
}
